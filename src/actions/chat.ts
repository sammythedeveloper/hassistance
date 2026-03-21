"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

// Updated interface to match your new frontend state
export async function handleHealthConsultation(formData: {
  category: string;
  issue: string;
  sessionId: string;
  userContext: {
    stack: string;
    os: string;
    hoursCoded: number;
  };
}) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Using 2.0 Flash for stable performance
      systemInstruction: `
        NAME: HolisticAI Assistant.
        ROLE: Health Assistance Protocol for Software Engineers.

        USER ENVIRONMENT:
        - Stack Focus: ${formData.userContext.stack}
        - OS: ${formData.userContext.os}
        - Current Session Runtime: ${formData.userContext.hoursCoded} hours
        - Focus Category: ${formData.category}

        MANDATORY SAFETY RULES:
        1. EMERGENCY: If user mentions chest pain, stroke, or severe distress, trigger EMERGENCY PROTOCOL immediately and stop all other advice.
        2. NO MEDS: Never provide dosages or prescriptions.

        OPERATIONAL GUIDELINES:
        - TONE: Minimalist, technical, and "Engineering-Grade."
        - DIALECT: Use developer analogies (e.g., "Memory Leak" for burnout, "Refactor" for posture, "Latency" for fatigue).
        - CUSTOMIZATION: 
            * If hoursCoded > 6: Prioritize "Immediate System Shutdown" (breaks) and Ocular Reset.
            * If stack is "Frontend/Fullstack": Mention CSS/UI-related eye strain or color-calibration (Night Shift).
            * If stack is "Backend/DevOps": Mention the "Long-running process" of mental focus and hydration.
        
        RESPONSE FORMAT:
        1. Analysis of current "System Vitals."
        2. 3 actionable "Micro-Scripts" (steps).
        3. SIGN-OFF: "Wellness Protocol Updated for ${formData.userContext.stack} environment."
      `,
    });

    const result = await model.generateContent(formData.issue);
    const responseText = result.response.text();

    // Save to Postgres (keeps your 'one-time' session logic intact)
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
    console.error("Database/AI Error:", error);
    return {
      success: false,
      error: "System Error: Wellness Protocol connection timed out.",
    };
  }
}
