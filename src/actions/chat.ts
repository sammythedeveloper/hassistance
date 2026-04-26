"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
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

  if (continuationSignals.some((signal) => lower.includes(signal))) {
    return false;
  }

  return closingSignals.some((signal) => lower.includes(signal));
}

function formatConversationHistory(history?: ConversationTurn[]): string {
  if (!history || history.length === 0) return "";

  return history
    .slice(-6)
    .map((turn, index) => {
      const normalizedContent = turn.content.replace(/\s+/g, " ").trim();
      return `${index + 1}. ${turn.role.toUpperCase()}: ${normalizedContent}`;
    })
    .join("\n");
}

/* -----------------------------
   1. INTENT CLASSIFIER (SAFE GUARD)
------------------------------ */
function classifyIntent(text: string): Intent {
  const lower = text.toLowerCase();

  // unsafe / unrelated domains (soft guard, NOT hard block)
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

  if (unsafeSignals.some((k) => lower.includes(k))) {
    return "unsafe";
  }

  if (outOfScopeSignals.some((k) => lower.includes(k))) {
    return "out_of_scope";
  }

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
   2. SYSTEM PROMPT BUILDER
------------------------------ */
function buildSystemPrompt({
  metrics,
  manualContext,
  category,
  baseConfig,
}: {
  metrics: TelemetryMetrics;
  manualContext: string;
  category: Category;
  baseConfig: ConsultationContext["baseConfig"];
}) {
  const categoryStatus = getCategoryStatus(category, metrics);
  const footerSignal = getCategoryFooterSignal(category, metrics);
  const inputMetrics = formatCategoryInputs(category, metrics);
  const loadMetrics = formatCategorySystemLoad(category, metrics);

  return `
NAME: Sheger (Holistic Developer Wellbeing System)
ROLE: You are a senior engineering lead and cognitive wellness assistant for software developers.

You operate ONLY in developer context:
- coding
- system design
- productivity
- cognitive load
- burnout prevention
- workspace optimization

--- USER CATEGORY MODE ---
Active Focus Area: ${category}

--- TELEMETRY STATE ---
Stack: ${baseConfig.stack}
OS: ${baseConfig.os ?? "Unknown"}
Input Metrics: ${inputMetrics}
Derived System Load: ${loadMetrics}
Category Status: ${categoryStatus.label} (${categoryStatus.severity})
Status Message: ${categoryStatus.statusMessage}

--- KNOWLEDGE BASE (RAG) ---
${manualContext}

--- BEHAVIOR RULES ---
1. Never provide unsolicited analysis. If the user sends only a greeting or meta message, reply briefly and ask what their specific concern is.

2. Only give recommendations when the user asks a concrete concern/symptom/problem.

3. Always acknowledge user emotion before advice when emotion or discomfort is present.

4. Never behave like a generic chatbot — always contextualize responses as system optimization advice.

5. FOLLOW-UP HANDLING:
   - If user asks a short follow-up like "will this help?" or "do you think that will work?", treat it as a continuation of the same thread.
   - Answer directly first (yes/probably + why), then provide 1-2 concrete adjustments.
   - Do NOT restart the conversation or ask them to restate their concern.

6. If user is out of scope:
   - DO NOT engage in topic
   - DO NOT lecture
   - REFRAME into developer wellbeing context
   Example:
   "I can’t assist with that directly, but we can look at how it might affect your focus or workflow."

7. If unsafe content is detected:
   Respond:
   "SECURITY ERROR: This request cannot be processed within system safety boundaries."

8. Tone:
   - calm
   - technical but human
   - supportive
   - slightly “engineering aesthetic”
   - avoid repetitive self-introductions

--- RESPONSE FORMAT (STRICT FOR CONCERN-BASED REPLIES) ---
For NEW concrete concerns, respond in markdown and keep one blank line between each section:

### Issue Snapshot
1-2 concise sentences that connect the user's concern to telemetry.

### Recommendations
› Step 1 on its own line
› Step 2 on its own line
› Step 3 on its own line (optional)

### Why This Works
One short explanatory paragraph in plain language.

### Next Checkpoint
One sentence describing what the user should monitor over the next 30-90 minutes.

---
_Disclaimer: I'm an AI assistant, not a medical professional. If symptoms persist, consult a qualified healthcare provider._

STATUS: ${categoryStatus.label} (${categoryStatus.severity}) | SIGNAL: ${footerSignal} | SYNC: ${new Date().toLocaleTimeString()}

Formatting constraints:
- Every bullet must be on its own line.
- Keep paragraphs to max 2 sentences.
- Avoid wall-of-text blocks.
- Keep recommendation headers as markdown headings (###) so they are visually scannable.

For greetings/meta messages:
- Reply in 1-2 short lines.
- Ask for the user's specific concern.
- Do not include markdown sections.
- Do not include STATUS footer.

For follow-up continuation questions:
- Reply naturally in 2-4 sentences.
- Give a direct confidence answer first, then a short practical next move.
- Avoid repeating the full template unless the user asks for a full reset plan.
`;
}

/* -----------------------------
   MAIN HANDLER
------------------------------ */
export async function handleHealthConsultation(
  formData: HealthConsultationRequest
): Promise<HealthConsultationResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return {
      success: false,
      error: "Protocol Connection Failure: Missing Gemini API key.",
    };
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    /* 1. TELEMETRY ENGINE */
    const metrics = calculateDeveloperMetrics(
      {
        hoursCoded: formData.context.baseConfig.hoursCoded,
        stack: formData.context.baseConfig.stack,
      },
      formData.context.categoryInputs ?? {}
    );

    /* 2. RAG RETRIEVAL */
    const relevantProtocols = retrieveRelevantProtocols(metrics, formData.category);

    const manualContext =
      relevantProtocols.length > 0
        ? relevantProtocols
            .map((p) => `[SOURCE: ${p.source}] ${p.title}: ${p.content}`)
            .join("\n\n")
        : "No active triggers. Provide general developer wellness optimization.";

    /* 3. INTENT CHECK (NEW LAYER) */
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
        answer: `Hey, I’m Sheger. Tell me your specific ${formData.category} concern, and I’ll give focused recommendations based on your current telemetry context.`,
        conversationEnded: false,
      };
    }

    let rewrittenInput = formData.issue;

    if (intent === "out_of_scope") {
      rewrittenInput =
        "User asked an unrelated topic. Reframe into developer productivity or cognitive load context.";
    }

    const recentConversationContext = formatConversationHistory(formData.history);
    const modelInput = recentConversationContext
      ? `RECENT CONVERSATION CONTEXT:\n${recentConversationContext}\n\nCURRENT USER MESSAGE:\n${rewrittenInput}`
      : rewrittenInput;

    /* 4. GEMINI MODEL */
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt({
        metrics,
        manualContext,
        category: formData.category,
        baseConfig: formData.context.baseConfig,
      }),
    });

    const result = await model.generateContent(modelInput);
    const responseText = result.response.text();

    /* 5. DATABASE STORAGE */
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
