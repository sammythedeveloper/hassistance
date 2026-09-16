"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { retrieveRelevantProtocols } from "@/lib/retriever";
import {
  calculateDeveloperMetrics,
  type BaseConfig,
  type Category,
  type CategoryMetricOverrides,
  type DomainStatus,
  type TelemetryMetrics,
} from "@/lib/telemetry";

type Intent = "unsafe" | "out_of_scope" | "developer_context";

interface ConsultationContext {
  baseConfig: BaseConfig & { os?: string };
  categoryInputs?: CategoryMetricOverrides;
}

interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

interface HealthConsultationRequest {
  category: Category;
  issue: string;
  sessionId: string;
  history?: ConversationTurn[];
  context: ConsultationContext;
}

interface HealthConsultationResponse {
  success: boolean;
  answer?: string;
  error?: string;
  conversationEnded?: boolean;
}

/* -----------------------------
   HELPERS
------------------------------ */

function isGreetingOrMetaQuestion(text: string): boolean {
  const lower = text.trim().toLowerCase();

  const exactPhrases = new Set([
    "hi",
    "hello",
    "hey",
    "hey there",
    "yo",
    "good morning",
    "good afternoon",
    "good evening",
    "ok",
    "okay",
    "i have a question",
    "can i ask a question",
    "question",
    "are you there",
  ]);

  if (exactPhrases.has(lower)) return true;
  if (lower.length <= 20 && /^(hi|hello|hey)\b/.test(lower)) return true;
  return false;
}

function isConversationClosingMessage(text: string): boolean {
  const lower = text.trim().toLowerCase();
  if (!lower) return false;

  const closingSignals = [
    "thanks",
    "thank you",
    "thanks for the help",
    "appreciate the help",
    "i appreciate the help",
    "that's all for today",
    "thats all for today",
    "all good for today",
    "this is really helpful",
    "it was really helpful",
  ];

  const continuationSignals = [
    "?",
    "one more",
    "another question",
    "also",
    "but ",
  ];

  if (continuationSignals.some((s) => lower.includes(s))) return false;
  return closingSignals.some((s) => lower.includes(s));
}

function formatConversationHistory(history?: ConversationTurn[]): string {
  if (!history || history.length === 0) return "";

  return history
    .slice(-6)
    .map((turn, index) => {
      const normalized = turn.content.replace(/\s+/g, " ").trim();
      return `${index + 1}. ${turn.role.toUpperCase()}: ${normalized}`;
    })
    .join("\n");
}

function classifyIntent(text: string): Intent {
  const lower = text.toLowerCase();

  const unsafeSignals = ["sex", "porn", "dating", "gambling", "casino"];
  const outOfScopeSignals = [
    "nba",
    "football",
    "soccer",
    "basketball",
    "crypto",
    "car",
    "tesla",
    "entertainment",
  ];

  if (unsafeSignals.some((k) => lower.includes(k))) return "unsafe";
  if (outOfScopeSignals.some((k) => lower.includes(k))) return "out_of_scope";
  return "developer_context";
}

function formatCategoryInputs(
  category: Category,
  metrics: TelemetryMetrics
): string {
  switch (category) {
    case "physical":
      return `Posture Load: ${metrics.physical.postureLoad}% | Hydration Deficit: ${metrics.physical.hydrationDeficit}% | Circulation Risk: ${metrics.physical.circulationRisk}%`;
    case "mental":
      return `Focus Capacity: ${metrics.mental.focusCapacity}% | Cognitive Load: ${metrics.mental.cognitiveLoad}% | Context Switch: ${metrics.mental.contextSwitchRate}%`;
    case "emotional":
      return `Stress Index: ${metrics.emotional.stressIndex}% | Frustration: ${metrics.emotional.frustrationLevel}% | Recovery Debt: ${metrics.emotional.recoveryDebt}%`;
    case "environmental":
      return `Noise Distraction: ${metrics.environmental.noiseDistractionIndex}% | Lighting Strain: ${metrics.environmental.lightingStrain}% | Workspace Ergonomics: ${metrics.environmental.workspaceErgonomics}%`;
  }
}

function formatCategorySystemLoad(
  category: Category,
  metrics: TelemetryMetrics
): string {
  switch (category) {
    case "physical":
      return `Body Strain: ${metrics.systemLoad.physical.bodyStrain}% | Recovery Capacity: ${metrics.systemLoad.physical.recoveryCapacity}%`;
    case "mental":
      return `Sustained Attention: ${metrics.systemLoad.mental.sustainedAttention}% | Decision Fatigue: ${metrics.systemLoad.mental.decisionFatigue}%`;
    case "emotional":
      return `Emotional Stability: ${metrics.systemLoad.emotional.emotionalStability}% | Escalation Risk: ${metrics.systemLoad.emotional.escalationRisk}%`;
    case "environmental":
      return `Sensory Load: ${metrics.systemLoad.environmental.sensoryLoad}% | Focus Support: ${metrics.systemLoad.environmental.focusSupport}%`;
  }
}

function getCategoryStatus(
  category: Category,
  metrics: TelemetryMetrics
): DomainStatus {
  return metrics.status[category];
}

function getCategoryFooterSignal(
  category: Category,
  metrics: TelemetryMetrics
): string {
  switch (category) {
    case "physical":
      return `BODY STRAIN ${metrics.systemLoad.physical.bodyStrain}%`;
    case "mental":
      return `ATTENTION ${metrics.systemLoad.mental.sustainedAttention}%`;
    case "emotional":
      return `ESCALATION ${metrics.systemLoad.emotional.escalationRisk}%`;
    case "environmental":
      return `SENSORY LOAD ${metrics.systemLoad.environmental.sensoryLoad}%`;
  }
}

/* -----------------------------
   SYSTEM PROMPT (STRICT)
------------------------------ */

function buildSystemPrompt({
  metrics,
  manualContext,
  category,
  baseConfig,
  protocolCount,
}: {
  metrics: TelemetryMetrics;
  manualContext: string;
  category: Category;
  baseConfig: ConsultationContext["baseConfig"];
  protocolCount: number;
}) {
  const categoryStatus = getCategoryStatus(category, metrics);
  const footerSignal = getCategoryFooterSignal(category, metrics);
  const inputMetrics = formatCategoryInputs(category, metrics);
  const loadMetrics = formatCategorySystemLoad(category, metrics);

  return `
NAME: DevPulse
ROLE: Strict narrator of retrieved protocols only.

CORE CONTRACT (NON-NEGOTIABLE):
- You may ONLY recommend protocols that appear in the KNOWLEDGE BASE section below.
- You may paraphrase them. You may never invent new interventions, tips, exercises, breathing techniques, or steps.
- Maximum number of recommendations = ${protocolCount}. Never exceed this number.
- If the user asks for something outside the retrieved protocols, say you can only work with what the current telemetry triggered.

--- ACTIVE DOMAIN ---
${category}

--- TELEMETRY ---
Stack: ${baseConfig.stack}
OS: ${baseConfig.os ?? "Unknown"}
Input Metrics: ${inputMetrics}
Derived Load: ${loadMetrics}
Status: ${categoryStatus.label} (${categoryStatus.severity})
Message: ${categoryStatus.statusMessage}

--- KNOWLEDGE BASE (ONLY SOURCE OF TRUTH) ---
${manualContext}

--- BEHAVIOR ---
1. Greetings / meta messages → short reply + ask for the concrete concern. No markdown sections. No STATUS footer.
2. Concrete concern → use the format below.
3. Follow-ups ("will this help?", "what else?", "any other tips?") → answer in 2–4 sentences. Do not restart the full template. Do not invent new protocols.
4. Out-of-scope → reframe once into developer load/focus context, then stop.
5. Unsafe → return exactly: "SECURITY ERROR: This request cannot be processed within system safety boundaries."

--- RESPONSE FORMAT (ONLY FOR NEW CONCRETE CONCERNS) ---
### Issue Snapshot
1–2 sentences that connect the user's concern to the current telemetry numbers.

### Recommendations
(Only list protocols that appear in the Knowledge Base above. One protocol = one line. Never invent.)

› [Exact or close title]: short paraphrase of the content

### Why This Works
One short paragraph explaining why these specific retrieved protocols match the current numbers.

### Next Checkpoint
One sentence on what the user should watch over the next 30–90 minutes.

---
_Disclaimer: I'm an AI assistant, not a medical professional. If symptoms persist, consult a qualified healthcare provider._

STATUS: ${categoryStatus.label} (${
    categoryStatus.severity
  }) | SIGNAL: ${footerSignal} | SYNC: ${new Date().toLocaleTimeString()}
`;
}

/* -----------------------------
   MAIN HANDLER
------------------------------ */

export async function handleHealthConsultation(
  formData: HealthConsultationRequest
): Promise<HealthConsultationResponse> {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return { success: false, error: "Unauthorized. Sign in required." };
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      success: false,
      error: "Protocol Connection Failure: Missing Gemini API key.",
    };
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // 1. Telemetry
    const metrics = calculateDeveloperMetrics(
      {
        hoursCoded: formData.context.baseConfig.hoursCoded,
        stack: formData.context.baseConfig.stack,
      },
      formData.context.categoryInputs ?? {}
    );

    // 2. Retrieval
    const relevantProtocols = retrieveRelevantProtocols(
      metrics,
      formData.category
    );

    // 3. Early exits (no model call)
    const intent = classifyIntent(formData.issue);

    if (intent === "unsafe") {
      return {
        success: true,
        answer:
          "SECURITY ERROR: This request cannot be processed within system safety boundaries.",
        conversationEnded: false,
      };
    }

    if (isConversationClosingMessage(formData.issue)) {
      return {
        success: true,
        answer:
          "You're welcome. Glad I could help today. If you want, we can continue anytime.",
        conversationEnded: true,
      };
    }

    if (isGreetingOrMetaQuestion(formData.issue)) {
      return {
        success: true,
        answer: `Session is live on ${formData.category}. What broke — load, environment, or a specific symptom?`,
        conversationEnded: false,
      };
    }

    // Hard short-circuit when nothing triggered
    if (relevantProtocols.length === 0) {
      const status = getCategoryStatus(formData.category, metrics);
      return {
        success: true,
        answer: `Current ${formData.category} signals are in band (${status.label} · ${status.severity}). No protocol crossed a threshold, so I have nothing ranked to run. Want to adjust the telemetry inputs and re-score?`,
        conversationEnded: false,
      };
    }

    // 4. Build context for the model
    const manualContext = relevantProtocols
      .map((p) => `[SOURCE: ${p.source}] ${p.title}: ${p.content}`)
      .join("\n\n");

    let rewrittenInput = formData.issue;
    if (intent === "out_of_scope") {
      rewrittenInput =
        "User asked an unrelated topic. Reframe once into developer productivity or cognitive load context, then stop.";
    }

    const recentConversationContext = formatConversationHistory(
      formData.history
    );
    const modelInput = recentConversationContext
      ? `RECENT CONVERSATION CONTEXT:\n${recentConversationContext}\n\nCURRENT USER MESSAGE:\n${rewrittenInput}`
      : rewrittenInput;

    // 5. Model call
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt({
        metrics,
        manualContext,
        category: formData.category,
        baseConfig: formData.context.baseConfig,
        protocolCount: relevantProtocols.length,
      }),
    });

    const result = await model.generateContent(modelInput);
    const responseText = result.response.text();

    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: { lastActiveAt: new Date() },
      create: { clerkUserId, lastActiveAt: new Date() },
    });
    
    let conversation = await prisma.conversation.findFirst({
      where: {
        userId: user.id,
        sessionId: formData.sessionId,
        category: formData.category,
      },
    });
    
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          category: formData.category,
          sessionId: formData.sessionId,
        },
      });
    }
    
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

    return {
      success: true,
      answer: responseText,
      conversationEnded: false,
    };
  } catch (error) {
    console.error("Critical System Failure:", error);
    return {
      success: false,
      error: "Protocol Connection Failure: Check server logs.",
    };
  }
}
