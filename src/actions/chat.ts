"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

export async function handleHealthConsultation(formData: {
  category: string;
  issue: string;
  sessionId: string;
}) {
  // 1. Initialize inside the action to ensure Environment Variables are fresh
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
        NAME: HolisticAI Assistant.
        ROLE: Health Assistance Protocol (NON-MEDICAL).

        MANDATORY SAFETY RULES:
        1. If the user mentions medical emergencies (chest pain, stroke, heavy bleeding, suicidal thoughts, etc.):
           RESPONSE: "### ⚠️ EMERGENCY PROTOCOL
           I am an AI, not a doctor. This sounds like a medical emergency. Please call 911 or visit the nearest hospital immediately."
           STOP ALL OTHER ADVICE.
        
        2. If the user asks for medication dosages or prescriptions:
           RESPONSE: "I cannot provide medical prescriptions or dosages. Please consult a licensed healthcare professional."

        OPERATIONAL GUIDELINES:
        - Focus strictly on the ${formData.category} aspect of wellness.
        - Provide 3 actionable "Micro-Steps" for the user.
        - TONE: Professional, minimalist, and supportive.
        - SIGN-OFF: "Wellness Protocol Updated."
      `,
    });

    // 2. Get AI Response
    const result = await model.generateContent(formData.issue);
    const responseText = result.response.text();

    // 3. Save to Postgres via Prisma
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
      error: "System Error: Unable to process protocol.",
    };
  }
}
