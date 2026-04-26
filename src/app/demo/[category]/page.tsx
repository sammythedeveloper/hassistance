"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSystem } from "@/context/SystemContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Send, Activity, Cpu, Zap, ChevronLeft, X, Star } from "lucide-react";

import {
  calculateDeveloperMetrics,
  type Category,
  type Severity,
} from "@/lib/telemetry";

const CATEGORIES: Category[] = [
  "physical",
  "mental",
  "emotional",
  "environmental",
];

const STACK_OPTIONS = ["Full Stack", "Frontend", "Backend", "DevOps"] as const;

interface MetricConfig {
  key: string;
  label: string;
  inverse?: boolean;
}

function isCategory(value: string | null): value is Category {
  return value !== null && CATEGORIES.includes(value as Category);
}

function toTitle(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildSystemOnlineMessage(category: Category | null): string {
  if (!category) {
    return `### SYSTEM ONLINE\n**HolisticAI is active. Environment: Pending selection.**\n\nSelect a category to initialize telemetry sync.`;
  }

  const environment = toTitle(category);

  const contextParagraph = (() => {
    switch (category) {
      case "physical":
        return "Long coding sessions often increase posture stress, hydration deficit, and circulation risk. Physical stability protects both focus and output quality.";
      case "mental":
        return "Sustained engineering performance depends on cognitive pacing. When context switching and load rise, decision quality and deep focus drop quickly.";
      case "emotional":
        return "Emotional regulation is core engineering infrastructure. Stress and recovery debt directly impact patience, communication, and execution accuracy.";
      case "environmental":
        return "Workspace conditions shape performance continuously. Noise, lighting strain, and poor ergonomics can silently degrade focus and increase fatigue.";
    }
  })();

  return `### SYSTEM ONLINE\n**HolisticAI is active. Environment: ${environment}.**\n\n${contextParagraph}\n\nShare your specific concern below to begin telemetry sync.`;
}

function getSystemLoadConfig(category: Category): MetricConfig[] {
  switch (category) {
    case "physical":
      return [
        { key: "bodyStrain", label: "Body Strain" },
        { key: "recoveryCapacity", label: "Recovery Capacity", inverse: true },
      ];
    case "mental":
      return [
        {
          key: "sustainedAttention",
          label: "Sustained Attention",
          inverse: true,
        },
        { key: "decisionFatigue", label: "Decision Fatigue" },
      ];
    case "emotional":
      return [
        {
          key: "emotionalStability",
          label: "Emotional Stability",
          inverse: true,
        },
        { key: "escalationRisk", label: "Escalation Risk" },
      ];
    case "environmental":
      return [
        { key: "sensoryLoad", label: "Sensory Load" },
        { key: "focusSupport", label: "Focus Support", inverse: true },
      ];
  }
}

function getInputConfig(category: Category): MetricConfig[] {
  switch (category) {
    case "physical":
      return [
        { key: "postureLoad", label: "Posture Load" },
        { key: "hydrationDeficit", label: "Hydration Deficit" },
        { key: "circulationRisk", label: "Circulation Risk" },
      ];
    case "mental":
      return [
        { key: "focusCapacity", label: "Focus Capacity", inverse: true },
        { key: "cognitiveLoad", label: "Cognitive Load" },
        { key: "contextSwitchRate", label: "Context Switching" },
      ];
    case "emotional":
      return [
        { key: "stressIndex", label: "Stress Index" },
        { key: "frustrationLevel", label: "Frustration" },
        { key: "recoveryDebt", label: "Recovery Debt" },
      ];
    case "environmental":
      return [
        { key: "noiseDistractionIndex", label: "Noise Level" },
        { key: "lightingStrain", label: "Lighting Strain" },
        { key: "workspaceErgonomics", label: "Workspace Ergonomics" },
      ];
  }
}

function getBarColorClass(
  value: number,
  inverse = false,
  variant: "primary" | "secondary" = "primary"
): string {
  const riskValue = inverse ? 100 - value : value;
  if (riskValue >= 80) return "bg-red-500";
  if (riskValue >= 60) return "bg-orange-500";
  if (variant === "secondary") {
    if (riskValue >= 40) return "bg-blue-500";
    return "bg-blue-400";
  }
  if (riskValue >= 40) return "bg-yellow-500";
  return "bg-emerald-500";
}

function getStatusTone(severity: Severity | undefined) {
  switch (severity) {
    case "Critical":
      return {
        text: "text-red-700 dark:text-red-500",
        border: "border-red-300/80 dark:border-red-500/40",
        bg: "bg-red-50 dark:bg-red-500/5",
        icon: "text-red-700 dark:text-red-500",
      };
    case "High":
      return {
        text: "text-orange-700 dark:text-orange-400",
        border: "border-orange-300/80 dark:border-orange-500/35",
        bg: "bg-orange-50 dark:bg-orange-500/5",
        icon: "text-orange-700 dark:text-orange-400",
      };
    case "Moderate":
      return {
        text: "text-amber-700 dark:text-yellow-400",
        border: "border-amber-300/80 dark:border-yellow-500/35",
        bg: "bg-amber-50 dark:bg-yellow-500/5",
        icon: "text-amber-700 dark:text-yellow-400",
      };
    default:
      return {
        text: "text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-300/80 dark:border-emerald-500/30",
        bg: "bg-emerald-50 dark:bg-emerald-500/5",
        icon: "text-emerald-700 dark:text-emerald-500",
      };
  }
}

const assistantMarkdownComponents: Components = {
  h3: ({ children }) => (
    <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-3 mt-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 last:mb-0 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-emerald-700 dark:text-emerald-400">{children}</strong>
  ),
  ul: ({ children }) => <ul className="mb-4 space-y-2">{children}</ul>,
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      <span className="mt-[1px] text-emerald-700 dark:text-emerald-400">›</span>
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="my-5 border-zinc-300 dark:border-zinc-700/70" />,
};

export default function DemoPage() {
  const params = useParams();
  const category = (params?.category as string)?.toLowerCase() || null;

  const { baseConfig, setBaseConfig, categoryInputs, setCategoryInputs } =
    useSystem();

  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConversationSurvey, setShowConversationSurvey] = useState(false);
  const [surveyRating, setSurveyRating] = useState(0);
  const [surveyHover, setSurveyHover] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeCategory = isCategory(category) ? category : null;
  const activeCategoryInputSignature = activeCategory
    ? JSON.stringify(
        (categoryInputs[activeCategory] ?? {}) as Record<string, number>
      )
    : "{}";
  const telemetrySignature = `${activeCategory ?? "none"}|${
    baseConfig.stack
  }|${baseConfig.hoursCoded}|${activeCategoryInputSignature}`;

  const systemOnlineMessage = useMemo(
    () => buildSystemOnlineMessage(activeCategory),
    [activeCategory]
  );

  const [chat, setChat] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([{ role: "assistant", content: systemOnlineMessage }]);

  useEffect(() => {
    setChat([{ role: "assistant", content: systemOnlineMessage }]);
    setIssue("");
    setShowConversationSurvey(false);
    setSurveyRating(0);
    setSurveyHover(0);
  }, [systemOnlineMessage, telemetrySignature]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const metrics = calculateDeveloperMetrics(
    {
      hoursCoded: baseConfig.hoursCoded,
      stack: baseConfig.stack,
    },
    categoryInputs
  );

  const activeStatus = activeCategory ? metrics.status[activeCategory] : null;
  const activeInputValues = activeCategory
    ? (metrics[activeCategory] as Record<string, number>)
    : {};
  const activeSystemLoadValues = activeCategory
    ? (metrics.systemLoad[activeCategory] as Record<string, number>)
    : {};
  const activeOverrides = activeCategory
    ? ((categoryInputs[activeCategory] ?? {}) as Record<string, number>)
    : {};

  const systemLoadRows = activeCategory
    ? getSystemLoadConfig(activeCategory).map((item) => ({
        ...item,
        value: activeSystemLoadValues[item.key] ?? 0,
      }))
    : [];

  const inputRows = activeCategory ? getInputConfig(activeCategory) : [];
  const statusTone = getStatusTone(activeStatus?.severity);

  const setCategoryMetric = (key: string, value: number) => {
    if (!activeCategory) return;

    setCategoryInputs((prev) => {
      const current = (prev[activeCategory] ?? {}) as Record<string, number>;
      return {
        ...prev,
        [activeCategory]: {
          ...current,
          [key]: value,
        },
      };
    });
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [issue]);

  const animateAssistantReply = async (fullText: string) => {
    if (!fullText) return;

    setChat((prev) => [...prev, { role: "assistant", content: "" }]);

    const step = () => Math.max(1, Math.ceil(fullText.length / 120));
    let index = 0;

    await new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        index = Math.min(fullText.length, index + step());
        const current = fullText.slice(0, index);

        setChat((prev) => {
          const next = [...prev];
          const lastIndex = next.length - 1;
          if (lastIndex >= 0) {
            next[lastIndex] = { role: "assistant", content: current };
          }
          return next;
        });

        if (index >= fullText.length) {
          clearInterval(timer);
          resolve();
        }
      }, 16);
    });
  };

  const submitMessage = async () => {
    const trimmedIssue = issue.trim();
    if (!trimmedIssue || !activeCategory) return;
    const historyForRequest = chat
      .slice(1)
      .slice(-8)
      .map((item) => ({ role: item.role, content: item.content }));

    setLoading(true);
    setIssue("");
    setChat((prev) => [...prev, { role: "user", content: trimmedIssue }]);
    setShowConversationSurvey(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: activeCategory,
          issue: trimmedIssue,
          sessionId,
          history: historyForRequest,
          context: {
            baseConfig,
            categoryInputs,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success || !data?.answer) {
        throw new Error(data?.error || "Request failed");
      }

      await animateAssistantReply(data.answer);
      setShowConversationSurvey(Boolean(data?.conversationEnded));
      if (!data?.conversationEnded) {
        setSurveyRating(0);
      }
    } catch {
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "SYSTEM ERROR: Connection failure.",
        },
      ]);
      setShowConversationSurvey(false);
    }

    setLoading(false);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitMessage();
  }

  const sidebarCards = (
    <>
      <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">
            System Load
          </span>
          <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
        </div>

        <div className="space-y-5">
          {systemLoadRows.map((row, index) => (
            <div className="space-y-2" key={row.key}>
              <div className="flex justify-between text-[12px]">
                <span>{row.label}</span>
                <span>{row.value}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800/70 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getBarColorClass(
                    row.value,
                    row.inverse,
                    index === 1 ? "secondary" : "primary"
                  )}`}
                  style={{ width: `${row.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] space-y-4">
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
          <Cpu className="h-3 w-3" />
          Hardware Config
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] text-zinc-500">
              Hours Coded Today
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={baseConfig.hoursCoded}
              onChange={(e) =>
                setBaseConfig((prev) => ({
                  ...prev,
                  hoursCoded: Number(e.target.value),
                }))
              }
              className="w-full accent-emerald-500 h-1 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>1h</span>
              <span>{baseConfig.hoursCoded}h</span>
              <span>12h</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] text-zinc-500">Stack Focus</label>
            <select
              value={baseConfig.stack}
              onChange={(e) =>
                setBaseConfig((prev) => ({
                  ...prev,
                  stack: e.target.value,
                }))
              }
              className="w-full bg-transparent text-sm border border-zinc-700 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-emerald-400"
            >
              {STACK_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-zinc-900">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-zinc-800/70 space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">
              {activeCategory ? `${activeCategory} Inputs` : "Category Inputs"}
            </div>
            {inputRows.map((row) => {
              const value =
                activeOverrides[row.key] ?? activeInputValues[row.key] ?? 0;

              return (
                <div key={row.key} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>{row.label}</span>
                    <span>{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) =>
                      setCategoryMetric(row.key, Number(e.target.value))
                    }
                    className="w-full accent-emerald-500 h-1 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`mt-auto p-4 border border-dashed rounded-2xl ${statusTone.border} ${statusTone.bg}`}
      >
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-[11px] font-bold uppercase ${statusTone.text}`}
          >
            Status: {activeStatus?.severity ?? "Idle"}
          </span>
          <Zap className={`h-4 w-4 ${statusTone.icon}`} />
        </div>
        <p className={`text-[11px] leading-relaxed italic ${statusTone.text}`}>
          {activeStatus?.statusMessage ??
            "Choose a category to view real-time domain status."}
        </p>
      </div>
    </>
  );

  return (
    <div className="flex h-[100dvh] flex-col bg-white dark:bg-zinc-950 text-black dark:text-white font-mono">
      <header className="shrink-0 flex items-center justify-between px-4 md:px-6 py-8 border-b border-zinc-800 bg-white/80 dark:bg-zinc-950/90 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/get-started">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black dark:bg-white p-1.5 rounded-lg">
              <Activity className="h-4 w-4 text-white dark:text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight">HolisticAI</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden rounded-full"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Cpu className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <main className="min-w-0 flex-1 flex flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto w-full max-w-5xl space-y-6">
              {chat.map((msg, i) => (
                <div key={i} className="space-y-3">
                  <div
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : i === 0
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-[1.5rem] px-5 py-4 shadow-sm ${
                        msg.role === "user"
                          ? "max-w-2xl bg-white text-zinc-900 border border-zinc-200"
                          : i === 0
                          ? "max-w-3xl bg-zinc-100 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 px-8 py-7 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.65)]"
                          : "max-w-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-800"
                      }`}
                    >
                      <div className="text-[15px] leading-relaxed">
                        <ReactMarkdown
                          components={
                            msg.role === "assistant"
                              ? assistantMarkdownComponents
                              : undefined
                          }
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {showConversationSurvey && !loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/65 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-blue-500">
                      Rate This Conversation
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSurveyRating(star)}
                          onMouseEnter={() => setSurveyHover(star)}
                          onMouseLeave={() => setSurveyHover(0)}
                          className="rounded-full p-1 transition-colors hover:bg-zinc-800"
                          aria-label={`Rate conversation ${star} out of 5`}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              star <= (surveyHover || surveyRating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-zinc-500"
                            }`}
                          />
                        </button>
                      ))}
                      {surveyRating > 0 && (
                        <span className="ml-1 text-[11px] text-zinc-400">
                          {surveyRating}/5
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="shrink-0 p-4 border-t border-neutral-100 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="relative rounded-[2.1rem] border border-zinc-800 bg-zinc-700/60">
                <Textarea
                  ref={textareaRef}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void submitMessage();
                    }
                  }}
                  placeholder={
                    activeCategory
                      ? `Describe your ${activeCategory} concern...`
                      : "Select a category"
                  }
                  disabled={!activeCategory || loading}
                  rows={1}
                  className="min-h-[56px] max-h-[220px] resize-none overflow-y-auto border-0 bg-transparent px-5 py-3 pr-16 text-[15px] leading-6 text-zinc-100 placeholder:text-zinc-300 shadow-none focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-transparent disabled:opacity-60"
                />

                <Button
                  type="submit"
                  disabled={!activeCategory || loading || !issue.trim()}
                  className="group absolute bottom-2.5 right-2.5 h-11 w-11 rounded-full border border-zinc-700 bg-zinc-700/70 hover:bg-zinc-700 disabled:opacity-40"
                >
                  <Send className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-emerald-400" />
                </Button>
              </div>
            </div>
          </form>
          <p className="text-[10px] text-center text-neutral-400 dark:text-zinc-600 mt-3 tracking-widest uppercase">
            Holistic AI Assistant
          </p>
        </main>

        <aside className="hidden xl:flex w-[360px] border-l border-zinc-800 p-6 flex-col gap-6 overflow-y-auto">
          {sidebarCards}
        </aside>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close telemetry panel"
          />
          <div className="absolute right-0 top-0 h-full w-[340px] max-w-[92vw] bg-white dark:bg-zinc-950 border-l border-zinc-800 p-5 shadow-2xl overflow-y-auto flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-zinc-400">
                Telemetry Panel
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {sidebarCards}
          </div>
        </div>
      )}
    </div>
  );
}
