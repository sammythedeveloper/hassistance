"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function handleHealthConsultation(formData: {
  category: string;
  issue: string;
  sessionId: string;
}) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are a supportive Health Assistant specializing in ${formData.category}. 
      Give helpful guidance but NEVER diagnose. Add a medical disclaimer.`,
    });

    // 1. Get AI Response
    const result = await model.generateContent(formData.issue);
    const responseText = result.response.text();

    // 2. Save to Postgres (The "Full Stack" part!)
    // We use 'upsert' to either find the existing session or create a new one
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
    return { success: false, error: "Something went wrong on the server." };
  }
}
