"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleHealthConsultation } from "@/actions/chat";
import { ModeToggle } from "@/components/mode-toggle";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ChevronLeft, Send, Activity, RefreshCcw } from "lucide-react";

export default function DemoPage() {
  const [issue, setIssue] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize with Greeting and Medical Disclaimer
  const [chat, setChat] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: `### Welcome to HolisticAI
I am your automated health assistance protocol. 

**DISCLAIMER:** I am an AI, not a doctor or professional. My suggestions are for informational purposes only. If you are experiencing a medical emergency, please **call 911** or visit your local hospital immediately.

**How can I optimize your wellness today?** Please select a category to begin.`,
    },
  ]);

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

    const result = await handleHealthConsultation({
      category,
      issue: userMessage,
      sessionId: "demo-session-1", // You can make this dynamic later
    });

    if (result.success && result.answer) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: result.answer },
      ]);
    } else {
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ System Failure: " + (result.error || "Connection Lost"),
        },
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* --- Header --- */}
      <header className="flex items-center justify-between px-6 py-6 border-b border-neutral-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 font-mono">
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
              className="text-[10px] text-zinc-500 hover:text-red-500 gap-2 uppercase tracking-widest"
            >
              <RefreshCcw className="h-3 w-3" /> Reset
            </Button>
          )}
          <ModeToggle />
        </div>
      </header>

      {/* --- Chat Area --- */}
      <main className="flex-1 overflow-hidden bg-neutral-50/30 dark:bg-zinc-950/50">
        <ScrollArea className="h-full px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8 font-mono ">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-5 py-4 rounded-3xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-none"
                      : "bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 text-neutral-800 dark:text-zinc-200 rounded-tl-none"
                  }`}
                >
                  <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none leading-relaxed">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* --- Category Buttons (Onboarding) --- */}
            {!category && (
              <div className="flex flex-wrap gap-3 justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {["Physical", "Mental", "Emotional", "Environmental"].map(
                  (cat) => (
                    <Button
                      key={cat}
                      variant="outline"
                      onClick={() => handleCategorySelect(cat)}
                      className="rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-8 py-6 text-lg transition-all"
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
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>

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
                : "Select a wellness category above"
            }
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="pr-14 py-7 font-mono rounded-2xl bg-neutral-50 dark:bg-zinc-900 border-neutral-200 dark:border-zinc-800 focus-visible:ring-black dark:focus-visible:ring-white"
          />
          <Button
            type="submit"
            disabled={loading || !issue || !category}
            size="icon"
            className="absolute right-2 rounded-xl h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-neutral-400 dark:text-zinc-600 mt-3 font-mono tracking-widest uppercase">
          HolisticAI Assistant • Experimental Wellness Protocol
        </p>
      </footer>
    </div>
  );
}
