"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleHealthConsultation } from "@/actions/chat";
import { ModeToggle } from "@/components/mode-toggle"; // Added this!
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ChevronLeft, Send, Activity } from "lucide-react";

export default function DemoPage() {
  const [issue, setIssue] = useState("");
  const [category, setCategory] = useState("Physical");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!issue || loading) return;

    setLoading(true);
    setChat((prev) => [...prev, { role: "user", content: issue }]);
    const currentIssue = issue;
    setIssue("");

    const result = await handleHealthConsultation({
      category,
      issue: currentIssue,
      sessionId: "demo-session-1",
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
          content: "Error: " + (result.error || "Failed to get response"),
        },
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* --- Top Navigation --- */}
      <header className="flex items-center justify-between px-6 py-10 border-b border-neutral-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 font-mono  ">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full ">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-black dark:bg-white p-1.5 rounded-lg">
              <Activity className="h-4 w-4 text-white dark:text-black" />
            </div>
            <h1 className="font-bold tracking-tight dark:text-white font-mono ">
              Health Assistant
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-neutral-100 dark:bg-zinc-900 p-1 rounded-full border dark:border-zinc-800">
            {["Physical", "Mental", "Emotional"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  category === cat
                    ? "bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* --- Chat History Area --- */}
      <main className="flex-1 overflow-hidden bg-neutral-50/30 dark:bg-zinc-950/50">
        <ScrollArea className="h-full px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8 font-mono ">
            {chat.length === 0 && (
              <div className="text-center py-20 space-y-4">
                <div className="bg-neutral-100 dark:bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto border dark:border-zinc-800">
                  <Activity className="h-8 w-8 text-neutral-400 dark:text-zinc-600" />
                </div>
                <h2 className="text-xl font-semibold dark:text-white">
                  How can I help you today?
                </h2>
                <p className="text-neutral-500 dark:text-zinc-400 max-w-sm mx-auto font-light">
                  Describe what's on your mind. I'll provide supportive,
                  holistic guidance.
                </p>
              </div>
            )}

            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-5 py-4 rounded-3xl ${
                    msg.role === "user"
                      ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-none shadow-lg"
                      : "bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 text-neutral-800 dark:text-zinc-200 rounded-tl-none shadow-sm"
                  }`}
                >
                  <ReactMarkdown className="prose prose-sm prose-neutral dark:prose-invert max-w-none leading-relaxed">
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 p-4 rounded-3xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-zinc-600 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>

      {/* --- Bottom Input Area --- */}
      <footer className="p-4 border-t border-neutral-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative flex items-center"
        >
          <Input
            placeholder={`Ask about ${category.toLowerCase()} wellness...`}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="pr-14 py-7 font-mono rounded-2xl bg-neutral-50 dark:bg-zinc-900 border-neutral-200 dark:border-zinc-800 focus-visible:ring-black dark:focus-visible:ring-white dark:text-white"
          />
          <Button
            type="submit"
            disabled={loading || !issue}
            size="icon"
            className="absolute right-2 rounded-xl bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-zinc-200 text-white dark:text-black transition-all h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-neutral-400 dark:text-zinc-600 mt-3 font-mono tracking-widest font-medium ">
          AI Assistant • For educational purposes only
        </p>
      </footer>
    </div>
  );
}
