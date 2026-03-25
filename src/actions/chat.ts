"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { retrieveRelevantProtocols } from "@/lib/retriever"; // Our Librarian
import { calculateDeveloperMetrics } from "@/lib/telemetry"; // Our Engine

export async function handleHealthConsultation(formData: {
  category: string;
  issue: string;
  sessionId: string;
  userContext: {
    stack: string;
    os: string;
    hoursCoded: number;
    // We'll calculate the rest on the fly for the RAG check
  };
}) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    // 1. DATA CALCULATION: Run the telemetry engine on the server
    const metrics = calculateDeveloperMetrics(
      formData.userContext.hoursCoded,
      formData.userContext.stack
    );

    // 2. RETRIEVAL (The "R" in RAG): Find matching protocols in our Manual
    const relevantProtocols = retrieveRelevantProtocols(metrics);

    // 3. AUGMENTATION (The "A" in RAG): Format the retrieved data for the AI
    const manualContext =
      relevantProtocols.length > 0
        ? relevantProtocols
            .map((p) => `[SOURCE: ${p.source}] ${p.title}: ${p.content}`)
            .join("\n\n")
        : "No specific telemetry triggers detected. Provide general high-performance developer wellness advice.";

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Sticking with Flash for 2026 speed
      systemInstruction: `
        NAME: HolisticAI Assistant (RAG-Enabled).
        ROLE: Health Operating System for Engineers.

        --- SYSTEM TELEMETRY DATA ---
        - Focus Capacity: ${metrics.focusCapacity}%
        - Ocular Strain: ${metrics.ocularStrain}%
        - Burnout Risk: ${metrics.burnoutRisk}
        - Current Session: ${formData.userContext.hoursCoded}h on ${
        formData.userContext.os
      }
        - Primary Stack: ${formData.userContext.stack}

        --- MANDATORY KNOWLEDGE BASE PROTOCOLS ---
        ${manualContext}

        OPERATIONAL GUIDELINES:
        - SOURCE TRUTH: You MUST prioritize the protocols from the Knowledge Base provided above.
        - ANALOGIES: Continue using dev-speak (e.g., "Memory Leak", "Thread-Safe", "Garbage Collection").
        - SAFETY: No meds. If emergency (Chest pain/Severe distress), trigger EMERGENCY PROTOCOL.
        
        RESPONSE STRUCTURE:
        1. "SYSTEM STATUS": Brief summary of telemetry and current risk.
        2. "EXECUTABLE SCRIPTS": 3 clear, step-by-step actions (use the Knowledge Base protocols if provided).
        3. "ENV LOG": "Wellness Protocol Sync: ${
          formData.userContext.stack
        } - ${new Date().toLocaleTimeString()}"
      `,
    });

    const result = await model.generateContent(formData.issue);
    const responseText = result.response.text();

    // --- DB STORAGE ---
    const conversation = await prisma.conversation.upsert({
      where: { sessionId: formData.sessionId },
      update: {},
      create: {
        sessionId: formData.sessionId,
        category: formData.category,
      },
    });

    await prisma.message.createMany({
      data: [
        {
          conversationId: conversation.id,
          role: "user",
          content: formData.issue,
        },
        {
          conversationId: conversation.id,
          role: "assistant",
          content: responseText,
        },
      ],
    });

    return { success: true, answer: responseText };
  } catch (error) {
    console.error("Critical System Failure:", error);
    return {
      success: false,
      error: "Protocol Connection Failure: Check server logs for digest.",
    };
  }
}
