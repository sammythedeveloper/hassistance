"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleHealthConsultation } from "@/actions/chat";
import { ModeToggle } from "@/components/mode-toggle";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import {
  ChevronLeft,
  Send,
  Activity,
  RefreshCcw,
  Settings2,
  Cpu,
  Zap,
} from "lucide-react";

export default function DemoPage() {
  const [issue, setIssue] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Idea 2: Developer Config State ---
  const [config, setConfig] = useState({
    stack: "Full Stack",
    os: "MacOS",
    hoursCoded: 4,
    theme: "Dark",
  });
  const [chat, setChat] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: `### Welcome to HolisticAI
I am your automated health assistance protocol. 

<div class="disclaimer">
**DISCLAIMER:** I am an AI, not a doctor or professional. My suggestions are for informational purposes only. If you are experiencing a medical emergency, please **call 911** or visit your local hospital immediately.
</div>

**How can I optimize your wellness today?** Please select a category to begin.`,
    },
  ]);
  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, loading]);

  const handleCategorySelect = (selectedCat: string) => {
    setCategory(selectedCat);
    setChat((prev) => [
      ...prev,
      { role: "user", content: `Protocol selected: ${selectedCat} Wellness.` },
    ]);
  };

  const handleReset = () => {
    setCategory(null);
    setIssue("");
    setChat([
      {
        role: "assistant",
        content:
          "### Protocol Reset.\nSelect a new wellness category to begin a fresh optimization sequence.",
      },
    ]);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!issue || loading || !category) return;

    setLoading(true);
    const userMessage = issue;
    setChat((prev) => [...prev, { role: "user", content: userMessage }]);
    setIssue("");

    // --- Idea 2: Passing Config to AI ---
    const result = await handleHealthConsultation({
      category,
      issue: userMessage,
      sessionId: "anonymous-session",
      userContext: config,
    });

    if (result.success && result.answer) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: result.answer },
      ]);
    } else {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ System Failure: Connection Lost" },
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden font-mono">
      {/* --- Header --- */}
      <header className="flex items-center justify-between px-6 py-6 border-b border-neutral-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-black dark:bg-white p-1.5 rounded-lg">
              <Activity className="h-4 w-4 text-white dark:text-black" />
            </div>
            <h1 className="font-bold tracking-tight dark:text-white">
              HolisticAI
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {category && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-[10px] text-zinc-500 hover:text-red-500 gap-2 uppercase tracking-widest transition-colors"
            >
              <RefreshCcw className="h-3 w-3" /> Reset
            </Button>
          )}
          <ModeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* --- Main Chat Area --- */}
        <main className="flex-1 overflow-hidden bg-neutral-50/30 dark:bg-zinc-950/50 relative">
          <ScrollArea className="h-full px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-8 pb-10">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] px-5 py-4 rounded-3xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-none"
                        : "bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 text-neutral-800 dark:text-zinc-200 rounded-tl-none"
                    }`}
                  >
                    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none leading-relaxed">
                      <ReactMarkdown
                        components={{
                          div: ({ node, className, children, ...props }) => {
                            if (className === "disclaimer") {
                              return (
                                <div className="my-4 p-4 border border-red-500/20 bg-red-500/5 rounded-xl text-red-600 dark:text-red-400 text-xs italic">
                                  {children}
                                </div>
                              );
                            }
                            return <div {...props}>{children}</div>;
                          },
                          strong: ({ children }) => (
                            <strong className="text-red-600 dark:text-red-500 font-bold">
                              {children}
                            </strong>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {!category && (
                <div className="flex flex-wrap gap-3 justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {["Physical", "Mental", "Emotional", "Environmental"].map(
                    (cat) => (
                      <Button
                        key={cat}
                        variant="outline"
                        onClick={() => handleCategorySelect(cat)}
                        className="rounded-full px-8 py-6 text-lg transition-all border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/5"
                      >
                        {cat}
                      </Button>
                    )
                  )}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 p-4 rounded-3xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </main>

        {/* --- Idea 3: Right Sidebar Bio-Metrics --- */}
        <aside className="hidden xl:flex flex-col w-80 border-l border-neutral-100 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 p-6 space-y-6">
          <div className="p-5 bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                System Load
              </span>
              <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-4">
              {/* Focus Capacity Calculation */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span>Focus Capacity</span>
                  <span>{Math.max(100 - config.hoursCoded * 8, 0)}%</span>
                </div>
                <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-700"
                    style={{
                      width: `${Math.max(100 - config.hoursCoded * 8, 0)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Eye Strain Calculation */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span>Ocular Strain</span>
                  <span
                    className={config.hoursCoded > 6 ? "text-orange-500" : ""}
                  >
                    {config.hoursCoded * 12}%
                  </span>
                </div>
                <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      config.hoursCoded > 6 ? "bg-orange-500" : "bg-blue-500"
                    }`}
                    style={{
                      width: `${Math.min(config.hoursCoded * 12, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Environment Config Panel */}
          <div className="p-5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
              <Cpu className="h-3 w-3" /> Hardware Config
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-zinc-500">
                  Hours Coded Today
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={config.hoursCoded}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      hoursCoded: parseInt(e.target.value),
                    })
                  }
                  className="accent-emerald-500 h-1"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                  <span>1h</span>
                  <span>{config.hoursCoded}h</span>
                  <span>12h</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-2">
                <label className="text-[9px] text-zinc-500">Stack Focus</label>
                <select
                  value={config.stack}
                  onChange={(e) =>
                    setConfig({ ...config, stack: e.target.value })
                  }
                  className="bg-transparent text-xs border-none focus:ring-0 text-emerald-500 p-0 cursor-pointer"
                >
                  <option>Full Stack</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>DevOps</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 border border-dashed border-emerald-500/20 rounded-2xl">
            <p className="text-[9px] text-emerald-600/60 leading-relaxed italic">
              System identifies you as a{" "}
              <span className="text-emerald-500">{config.stack}</span> engineer.
              All protocols adjusted for{" "}
              <span className="text-emerald-500">{config.os}</span> logic.
            </p>
          </div>
        </aside>
      </div>

      {/* --- Input Area --- */}
      <footer className="p-4 border-t border-neutral-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative flex items-center"
        >
          <Input
            disabled={!category}
            placeholder={
              category
                ? `Describe your ${category.toLowerCase()} concern...`
                : "Select a wellness category"
            }
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="pr-14 py-7 rounded-2xl bg-neutral-50 dark:bg-zinc-900 border-neutral-200 dark:border-zinc-800 focus-visible:ring-emerald-500"
          />
          <Button
            type="submit"
            disabled={loading || !issue || !category}
            size="icon"
            className="absolute right-2 rounded-xl h-10 w-10 bg-emerald-600 hover:bg-emerald-700"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-neutral-400 dark:text-zinc-600 mt-3 tracking-widest uppercase">
          Holistic <span className="text-red-800">AI</span> Assistant • Protocol
          Optimized for <span className="text-emerald-500">{config.stack}</span>{" "}
          Engineers 😎
        </p>
      </footer>
    </div>
  );
}
