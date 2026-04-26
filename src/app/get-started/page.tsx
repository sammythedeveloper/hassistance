"use client";

import { useState, useEffect } from "react";
import { Activity, Heart, Globe, Cpu, ChevronRight } from "lucide-react";
import Link from "next/link";

function Typewriter({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

const categories = {
  physical: {
    label: "Physical",
    icon: Activity,
    desc: "Refactor your hardware. Optimize circulation, posture, and recovery cycles.",
  },
  mental: {
    label: "Mental",
    icon: Cpu,
    desc: "Clear the cache. Cognitive load management and logic-path optimization.",
  },
  emotional: {
    label: "Emotional",
    icon: Heart,
    desc: "Manage system state. Baseline regulation and stress-test mitigation.",
  },
  environmental: {
    label: "Environmental",
    icon: Globe,
    desc: "Context awareness. Modifying your workspace for signal-to-noise ratio.",
  },
};

export default function GetStarted() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 p-10 font-mono">
      <div className="max-w-4xl mx-auto space-y-24 py-20">
        {/* Intro */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter">The Protocol</h1>
          <div className="text-zinc-500 leading-relaxed max-w-xl text-lg">
            <Typewriter text="Select your current bottleneck. I will initialize the correct wellness pipeline." />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categories).map(
            ([key, { icon: Icon, desc, label }]) => (
              <Link
                key={key}
                href={`/demo/${key}`}
                className="p-6 border rounded-2xl hover:border-emerald-500 hover:bg-emerald-500/5 transition group"
              >
                <Icon className="w-6 h-6 mb-4 text-emerald-500" />
                <div className="font-bold text-lg mb-2">{label}</div>
                <div className="text-xs text-zinc-500">{desc}</div>
                <ChevronRight className="w-4 h-4 mt-4 text-zinc-400 group-hover:text-emerald-500" />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
