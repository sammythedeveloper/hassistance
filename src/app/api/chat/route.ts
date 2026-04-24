import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemInstruction } from "@/actions/chat";

export async function POST(req: Request) {
  const { issue, userContext } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  
  // Get the FULL, ORIGINAL prompt from your Brain function
  const instruction = await getSystemInstruction(userContext);
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", 
    systemInstruction: instruction 
  });

  const result = await model.generateContentStream(issue);

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        controller.enqueue(new TextEncoder().encode(chunk.text()));
      }
      controller.close();
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain" } });
}