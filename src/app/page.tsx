// src/app/page.tsx
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Activity, Play } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-500">
      <nav className="flex items-center justify-between px-10 py-6 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-black dark:text-white" />
          <span className="text-xl tracking-tighter font-mono ">
            HolisticAI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/demo">
            <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg px-6 transition-all font-mono ">
              Try for free
            </Button>
          </Link>
        </div>
      </nav>
      {/* --- Hero Section --- */}
      <main className="max-w-[1400px] mx-auto px-10 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl leading-none font-mono">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-black to-zinc-500 dark:from-white dark:to-zinc-600">
              Health Ai.
            </span>
            <br />
            <span className="text-sm md:text-xl tracking-[0.3em] text-orange-500 dark:text-orange-400 block mt-2 font-mono opacity-80">
              Without the slop.
            </span>
          </h1>
          <p className="max-w-md text-xl text-neutral-500 dark:text-zinc-400 leading-relaxed font-mono">
            Advanced wellness guidance designed for the modern developer.
            Secure, fast, and beautifully dark.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <Link href="/demo">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-black dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 transition-transform font-mono"
              >
                Start Here
              </Button>
            </Link>
          </div>
        </div>
        {/* RIGHT: The Floating Card with Mock Content */}
        <div className="relative group max-w-lg w-full">
          {/* Subtle Glow for Dark Mode */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-0 dark:opacity-40 group-hover:opacity-60 transition-opacity" />

          <div className="relative bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[4/3] transition-colors flex flex-col">
            {/* Browser Header */}
            <div className="p-4 border-b border-neutral-50 dark:border-zinc-800 flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-emerald-500" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  Protocol: Active
                </span>
              </div>
            </div>

            {/* Mock Conversation Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 font-mono">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%]">
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                    I've been staring at code for 8 hours and my brain feels
                    fried.
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100/50 dark:border-emerald-500/20 px-4 py-4 rounded-2xl rounded-tl-none max-w-[90%]">
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      OPTIMIZATION SEQUENCE INITIATED:
                    </p>
                    <ul className="space-y-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                      <li className="flex gap-2">
                        <span className="text-emerald-500">01</span>
                        <span>Hydration + Electrolyte check.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-500">02</span>
                        <span>Box Breathing (4-4-4-4) for 2 minutes.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-500">03</span>
                        <span>Distance Vision Reset: Look 20ft away.</span>
                      </li>
                    </ul>
                    <p className="text-[9px] pt-2 text-emerald-600/70 dark:text-emerald-400/50 italic">
                      Wellness Protocol Updated.
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated Loading Indicator */}
              <div className="flex justify-start animate-pulse">
                <div className="h-2 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
