// "use client";

// import { useRouter } from "next/navigation";
// import { Activity, Brain, Heart, Globe, Cpu } from "lucide-react";
// import { useState, useEffect } from "react";


// // --- Typewriter Component (Colocated) ---
// function Typewriter({ text, speed = 20 }: { text: string; speed?: number }) {
//     const [displayed, setDisplayed] = useState("");
  
//     useEffect(() => {
//       let i = 0;
//       const timer = setInterval(() => {
//         if (i < text.length) {
//           setDisplayed((prev) => prev + text.charAt(i));
//           i++;
//         } else {
//           clearInterval(timer);
//         }
//       }, speed);
//       return () => clearInterval(timer);
//     }, [text, speed]);
  
//     return <span>{displayed}</span>;
//   }



// const categories = {
//   Physical: { icon: Activity, desc: "Refactor your hardware." },
//   Mental: { icon: Cpu, desc: "Clear the cache." },
//   Emotional: { icon: Heart, desc: "Manage system state." },
//   Environmental: { icon: Globe, desc: "Optimize surroundings." },
// };

// export default function GetStarted() {
//   const router = useRouter();

//   const handleSelect = (key: string) => {
//     router.push(`/demo?category=${key.toLowerCase()}`);
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-zinc-950 p-10 font-mono">
//       <div className="max-w-2xl mx-auto space-y-16 py-20">
        
//         {/* Intro Section */}
//         <div className="space-y-6">
//           <h1 className="text-4xl font-bold tracking-tighter">The Protocol</h1>
//           <div className="text-zinc-500 leading-relaxed max-w-xl text-lg">
//              <Typewriter text="As developers, we spend our lives optimizing code, architectures, and performance. Yet, we often neglect the hardware running the entire system: ourselves. Select your current bottleneck, and I will initialize the appropriate wellness sequence." />
//           </div>
//         </div>

//         {/* Selection Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {Object.entries(categories).map(([key, { icon: Icon, desc }]) => (
//             <button
//               key={key}
//               onClick={() => handleSelect(key)}
//               className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left hover:border-emerald-500 transition-colors group"
//             >
//               <Icon className="w-6 h-6 mb-4 text-emerald-500" />
//               <div className="font-bold text-lg">{key}</div>
//               <div className="text-xs text-zinc-500 mt-1">{desc}</div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Activity, Heart, Globe, Cpu, ChevronRight } from "lucide-react";
import Link from "next/link";

// --- Typewriter Component (Colocated) ---
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
  Physical: { icon: Activity, desc: "Refactor your hardware. Optimize circulation, posture, and recovery cycles." },
  Mental: { icon: Cpu, desc: "Clear the cache. Cognitive load management and logic-path optimization." },
  Emotional: { icon: Heart, desc: "Manage system state. Baseline regulation and stress-test mitigation." },
  Environmental: { icon: Globe, desc: "Context awareness. Modifying your workspace for signal-to-noise ratio." },
};

export default function GetStarted() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 p-10 overflow-hidden font-mono text-zinc-900 dark:text-zinc-100">

      <div className="relative z-10 max-w-4xl mx-auto space-y-24 py-20">
        
        {/* Intro Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter">The Protocol</h1>
          <div className="text-zinc-500 leading-relaxed max-w-xl text-lg">
             <Typewriter text="As developers, we spend our lives optimizing code, architectures, and performance. Yet, we often neglect the hardware running the entire system: ourselves. Select your current bottleneck, and I will initialize the appropriate wellness sequence." />
          </div>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categories).map(([key, { icon: Icon, desc }]) => (
            <button
              key={key}
              onClick={() => router.push(`/demo?category=${key.toLowerCase()}`)}
              className="p-6 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl text-left hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group"
            >
              <Icon className="w-6 h-6 mb-4 text-emerald-500" />
              <div className="font-bold text-lg mb-2">{key}</div>
              <div className="text-xs text-zinc-500 leading-relaxed">{desc}</div>
              <ChevronRight className="w-4 h-4 mt-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            </button>
          ))}
        </div>

        {/* Expanded Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-zinc-200 dark:border-zinc-800">
          {[
            { title: "Root Cause Analysis", body: "We don't offer generic pills. The system runs diagnostic queries on your daily flow to identify the actual source of your fatigue." },
            { title: "Low-Latency Logic", body: "Wellness protocols designed to fit into your coding sprints. Micro-breaks that maximize system throughput without breaking focus." },
            { title: "Encrypted Context", body: "Zero data leakage. Your physical and mental telemetry is processed locally or within an encrypted tunnel." }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-widest">{item.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
          </div>
          <footer className="max-w-[1400px] mx-auto px-10 py-12 border-t border-neutral-100 dark:border-zinc-900 font-mono">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-60">
            <Activity className="h-4 w-4" />
            <span className="text-sm tracking-tighter">HolisticAI</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-widest text-neutral-500 dark:text-zinc-500">
            <Link href="/about" className="hover:text-emerald-500 transition-colors">About Project</Link>
            <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy & Data</Link>
            <Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms of Use</Link>
          </div>

          <div className="text-[10px] text-neutral-400 dark:text-zinc-600">
            © 2026 / Build 0.1.0
          </div>
        </div>
      </footer>
    </div>
  );
}