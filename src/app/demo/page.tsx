// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { saveConversation } from "@/actions/chat";
// import { ModeToggle } from "@/components/mode-toggle";
// import ReactMarkdown from "react-markdown";
// import Link from "next/link";
// import {
//   ChevronLeft,
//   Send,
//   Activity,
//   RefreshCcw,
//   Settings2,
//   Cpu,
//   Zap,
// } from "lucide-react";
// import { calculateDeveloperMetrics, TelemetryMetrics } from "@/lib/telemetry";

// // --- 1. TYPES ---
// interface ConfigState {
//   stack: string;
//   os: string;
//   hoursCoded: number;
//   theme: string;
//   language: string;
// }

// interface ConfigPanelProps {
//   config: ConfigState;
//   setConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
//   metrics: TelemetryMetrics;
// }
// const translations = {
//   en: {
//     systemLoad: "System Load",
//     focusCapacity: "Focus Capacity",
//     ocularStrain: "Ocular Strain",
//     hardwareConfig: "Hardware Config",
//     hoursCoded: "Hours Coded Today",
//     stackFocus: "Stack Focus",
//     systemLang: "System Language",
//     reset: "Reset",
//     systemConfig: "System Config",
//     placeholder: (cat: string) =>
//       `Describe your ${cat.toLowerCase()} concern...`,
//     selectCategory: "Select a wellness category",
//     status: "Status",
//     assistantName: "Holistic AI Assistant",
//     initialPrompt:
//       "Select an optimization pathway below to begin telemetry sync.",
//   },
//   am: {
//     systemLoad: "የስርዓት ጭነት",
//     focusCapacity: "የትኩረት አቅም",
//     ocularStrain: "የዓይን ድካም",
//     hardwareConfig: "የሃርድዌር ውቅር",
//     hoursCoded: "ዛሬ የሰራሁት ሰዓት",
//     stackFocus: "የስታክ ትኩረት",
//     systemLang: "የስርዓት ቋንቋ",
//     reset: "ዳግም አስጀምር",
//     systemConfig: "የስርዓት ውቅር",
//     placeholder: (cat: string) => `የ${cat.toLowerCase()} ስጋትዎን ይግለጹ...`,
//     selectCategory: "የጤና ዘርፍ ይምረጡ",
//     status: "ሁኔታ",
//     assistantName: "Holistic AI ረዳት",
//     initialPrompt: "የቴሌሜትሪ ማመሳሰል ለመጀመር ከታች ያለውን የማመቻቸት መንገድ ይምረጡ።",
//   },
// };
// // --- 2. SHARED COMPONENT (ConfigPanel) ---
// function ConfigPanel({ config, setConfig, metrics }: ConfigPanelProps) {
//   return (
//     <div className="space-y-6">
//       <div className="p-5 bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 rounded-[2rem] shadow-sm space-y-6">
//         <div className="flex items-center justify-between">
//           <span className="text-[10px] uppercase tracking-widest text-zinc-400">
//             System Load
//           </span>
//           <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <div className="flex justify-between text-[10px]">
//               <span>Focus Capacity</span>
//               <span>{metrics.focusCapacity}%</span>
//             </div>
//             <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-emerald-500 transition-all duration-700"
//                 style={{ width: `${metrics.focusCapacity}%` }}
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <div className="flex justify-between text-[10px]">
//               <span>Ocular Strain</span>
//               <span
//                 className={metrics.ocularStrain > 50 ? "text-orange-500" : ""}
//               >
//                 {metrics.ocularStrain}%
//               </span>
//             </div>
//             <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
//               <div
//                 className={`h-full transition-all duration-700 ${
//                   metrics.ocularStrain > 50 ? "bg-orange-500" : "bg-blue-500"
//                 }`}
//                 style={{ width: `${metrics.ocularStrain}%` }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-[2rem] space-y-4">
//         <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
//           <Cpu className="h-3 w-3" /> Hardware Config
//         </div>
//         <div className="space-y-3">
//           <div className="flex flex-col gap-1">
//             <label className="text-[9px] text-zinc-500">
//               Hours Coded Today
//             </label>
//             <input
//               type="range"
//               min="1"
//               max="12"
//               value={config.hoursCoded}
//               onChange={(e) =>
//                 setConfig({ ...config, hoursCoded: parseInt(e.target.value) })
//               }
//               className="accent-emerald-500 h-1 cursor-pointer"
//             />
//             <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
//               <span>1h</span>
//               <span>{config.hoursCoded}h</span>
//               <span>12h</span>
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 pt-2">
//             <label className="text-[9px] text-zinc-500">Stack Focus</label>
//             <select
//               value={config.stack}
//               onChange={(e) => setConfig({ ...config, stack: e.target.value })}
//               className="bg-transparent text-xs border-none focus:ring-0 text-emerald-500 p-0 cursor-pointer"
//             >
//               <option>Full Stack</option>
//               <option>Frontend</option>
//               <option>Backend</option>
//               <option>DevOps</option>
//             </select>
//           </div>
//           <div className="flex flex-col gap-1 pt-2">
//             <label className="text-[9px] text-zinc-500">System Language</label>
//             <select
//               value={config.language}
//               onChange={(e) =>
//                 setConfig({ ...config, language: e.target.value })
//               }
//               className="bg-transparent text-xs border-none focus:ring-0 text-emerald-500 p-0 cursor-pointer"
//             >
//               <option value="en">English</option>
//               <option value="am">አማርኛ (Amharic)</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- 3. MAIN PAGE ---
// export default function DemoPage() {
//   const [issue, setIssue] = useState("");
//   const [category, setCategory] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const [config, setConfig] = useState<ConfigState>({
//     stack: "Full Stack",
//     os: "MacOS",
//     hoursCoded: 4,
//     theme: "Dark",
//     language: "en",
//   });
//   const t = config.language === "am" ? translations.am : translations.en;
//   const metrics = calculateDeveloperMetrics(config.hoursCoded, config.stack);

//   const [chat, setChat] = useState<{ role: string; content: string }[]>([
//     {
//       role: "assistant",
//       content: `### SYSTEM ONLINE\n**HolisticAI** is active. Environment: **${config.stack}**.\n\nSelect an optimization pathway below to begin telemetry sync.`,
//     },
//   ]);

//   useEffect(() => {
//     if (scrollRef.current)
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [chat, loading]);

//   const handleCategorySelect = (selectedCat: string) => {
//     setCategory(selectedCat);
//     setChat((prev) => [
//       ...prev,
//       {
//         role: "user",
//         content: `Initializing ${selectedCat} Wellness Protocol.`,
//       },
//     ]);
//   };

//   const handleReset = () => {
//     setCategory(null);
//     setIssue("");
//     setChat([
//       {
//         role: "assistant",
//         content:
//           "### Protocol Reset.\nStanding by for new wellness category selection.",
//       },
//     ]);
//   };

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!issue || loading || !category) return;

//     setLoading(true);
//     const userMessage = issue;

//     // 1. Add User Message
//     setChat((prev) => [...prev, { role: "user", content: userMessage }]);
//     setIssue("");

//     // 2. Add empty Assistant message to stream into
//     setChat((prev) => [...prev, { role: "assistant", content: "" }]);

//     let fullResponse = "";

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           category,
//           issue: userMessage,
//           userContext: config,
//         }),
//       });

//       if (!response.body) throw new Error("No response body");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value, { stream: true });
//         fullResponse += chunk;

//         // Update the last message in state
//         setChat((prev) => {
//           const newChat = [...prev];
//           newChat[newChat.length - 1].content = fullResponse;
//           return newChat;
//         });
//       }

//       // 3. Save to DB AFTER the stream finishes
//       await saveConversation(
//         "anonymous-session",
//         category,
//         userMessage,
//         fullResponse
//       );
//     } catch (error) {
//       console.error("Stream failed", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden font-mono">
//       {/* Mobile Drawer */}
//       {isSettingsOpen && (
//         <div className="fixed inset-0 z-50 xl:hidden">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setIsSettingsOpen(false)}
//           />
//           <div className="absolute right-0 top-0 h-full w-[300px] bg-white dark:bg-zinc-950 border-l border-zinc-800 p-6 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
//                 System Config
//               </h2>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsSettingsOpen(false)}
//               >
//                 ×
//               </Button>
//             </div>
//             <ConfigPanel
//               config={config}
//               setConfig={setConfig}
//               metrics={metrics}
//             />
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <header className="flex items-center justify-between px-6 py-6 border-b border-neutral-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
//         <div className="flex items-center gap-4">
//           <Link href="/">
//             <Button variant="ghost" size="icon" className="rounded-full">
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//           </Link>
//           <div className="flex items-center gap-2">
//             <div className="bg-black dark:bg-white p-1.5 rounded-lg">
//               <Activity className="h-4 w-4 text-white dark:text-black" />
//             </div>
//             <h1 className="font-bold tracking-tight dark:text-white">
//               HolisticAI
//             </h1>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {category && (
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleReset}
//               className="text-[10px] text-zinc-500 uppercase tracking-widest"
//             >
//               <RefreshCcw className="h-3 w-3 mr-2" /> {t.reset}
//             </Button>
//           )}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="xl:hidden rounded-full text-emerald-500"
//             onClick={() => setIsSettingsOpen(true)}
//           >
//             <Settings2 className="h-5 w-5" />
//           </Button>
//           <ModeToggle />
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden relative">
//         <main className="flex-1 overflow-hidden bg-neutral-50/30 dark:bg-zinc-950/50 relative">
//           <ScrollArea className="h-full px-4 py-8">
//             <div className="max-w-2xl mx-auto space-y-8 pb-10">
//               {chat.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`flex ${
//                     msg.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[90%] px-6 py-5 rounded-[2rem] shadow-sm ${
//                       msg.role === "user"
//                         ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-none"
//                         : "bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 text-neutral-800 dark:text-zinc-200 rounded-tl-none"
//                     }`}
//                   >
//                     <div className="w-full text-left text-[13px] leading-relaxed">
//                       <ReactMarkdown
//                         components={{
//                           div: ({ className, children }) =>
//                             className === "disclaimer" ? (
//                               <div className="my-4 p-3 border-l-2 border-emerald-500 bg-emerald-500/5 text-zinc-500 text-[10px] uppercase tracking-wider leading-normal">
//                                 {children}
//                               </div>
//                             ) : (
//                               <div className="w-full">{children}</div>
//                             ),
//                           h3: ({ children }) => (
//                             <h3 className="text-emerald-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 mt-2">
//                               {children}
//                             </h3>
//                           ),
//                           strong: ({ children }) => (
//                             <span className="text-emerald-400 font-mono font-medium">
//                               {children}
//                             </span>
//                           ),
//                           p: ({ children }) => (
//                             <p className="text-zinc-400 mb-4 last:mb-0 w-full break-words leading-relaxed">
//                               {children}
//                             </p>
//                           ),
//                           li: ({ children }) => (
//                             <li className="flex gap-2 items-start mb-3 text-zinc-400 group">
//                               <span className="text-emerald-500 font-bold">
//                                 ›
//                               </span>
//                               <div className="flex-1 text-[12px] font-mono leading-normal break-words">
//                                 {children}
//                               </div>
//                             </li>
//                           ),
//                           ul: ({ children }) => (
//                             <ul className="pl-0 mb-6 w-full flex flex-col items-stretch">
//                               {children}
//                             </ul>
//                           ),
//                           hr: () => <hr className="border-zinc-800 my-6" />,
//                           code: ({ children }) => (
//                             <code className="bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded text-zinc-400 font-mono border border-zinc-700">
//                               {children}
//                             </code>
//                           ),
//                         }}
//                       >
//                         {msg.content}
//                       </ReactMarkdown>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {!category && (
//                 <div className="flex flex-wrap gap-3 justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
//                   {["Physical", "Mental", "Emotional", "Environmental"].map(
//                     (cat) => (
//                       <Button
//                         key={cat}
//                         variant="outline"
//                         onClick={() => handleCategorySelect(cat)}
//                         className="rounded-full px-8 py-6 text-lg transition-all border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/5"
//                       >
//                         {cat}
//                       </Button>
//                     )
//                   )}
//                 </div>
//               )}
//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 p-4 rounded-3xl rounded-tl-none flex gap-1">
//                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
//                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
//                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
//                   </div>
//                 </div>
//               )}
//               <div ref={scrollRef} />
//             </div>
//           </ScrollArea>
//         </main>

//         <aside className="hidden xl:flex flex-col w-80 border-l border-neutral-100 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 p-6 space-y-6">
//           <ConfigPanel
//             config={config}
//             setConfig={setConfig}
//             metrics={metrics}
//           />
//           <div className="mt-auto p-4 border border-dashed border-emerald-500/20 rounded-2xl bg-emerald-500/5">
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-[9px] font-bold text-emerald-500 uppercase">
//                 Status: {metrics.burnoutRisk}
//               </span>
//               <Zap
//                 className={`h-3 w-3 ${
//                   metrics.burnoutRisk === "Critical"
//                     ? "text-red-500"
//                     : "text-emerald-500"
//                 }`}
//               />
//             </div>
//             <p className="text-[9px] text-emerald-600/80 leading-relaxed italic">
//               {metrics.statusMessage}
//             </p>
//           </div>
//         </aside>
//       </div>

//       <div className="p-4 border-t border-neutral-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-3xl mx-auto relative flex items-end" // Changed items-center to items-end
//         >
//           <Textarea
//             disabled={!category}
//             placeholder={
//               category
//                 ? `Describe your ${category.toLowerCase()} concern...`
//                 : "Select a wellness category"
//             }
//             value={issue}
//             onChange={(e) => setIssue(e.target.value)}
//             className="min-h-[60px] resize-none pr-14 py-4 rounded-2xl bg-neutral-50 dark:bg-zinc-900 border-neutral-200 dark:border-zinc-800 focus-visible:ring-emerald-500"
//           />

//           <Button
//             type="submit"
//             disabled={loading || !issue || !category}
//             size="icon"
//             className="absolute right-2 bottom-2 rounded-xl h-10 w-10 bg-emerald-600 hover:bg-emerald-700" // Aligned to bottom
//           >
//             <Send className="h-5 w-5 text-white" />
//           </Button>
//         </form>
//         <p className="text-[10px] text-center text-neutral-400 dark:text-zinc-600 mt-3 tracking-widest uppercase">
//           Holistic AI Assistant
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { saveConversation } from "@/actions/chat";
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
  Heart,
  Globe,
} from "lucide-react";
import { calculateDeveloperMetrics, TelemetryMetrics } from "@/lib/telemetry";

// --- 1. TYPES & TRANSLATIONS ---
interface ConfigState {
  stack: string;
  os: string;
  hoursCoded: number;
  theme: string;
  language: string;
}

interface ConfigPanelProps {
  config: ConfigState;
  setConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
  metrics: TelemetryMetrics;
  t: any;
}
const categoryConfig = {
  Physical: { icon: Activity, desc: "System Optimization" },
  Mental: { icon: Cpu, desc: "Processing Logic" },
  Emotional: { icon: Heart, desc: "State Equilibrium" },
  Environmental: { icon: Globe, desc: "Context Awareness" },
};

const translations = {
  en: {
    systemLoad: "System Load",
    focusCapacity: "Focus Capacity",
    ocularStrain: "Ocular Strain",
    hardwareConfig: "Hardware Config",
    hoursCoded: "Hours Coded Today",
    stackFocus: "Stack Focus",
    systemLang: "System Language",
    reset: "Reset",
    systemConfig: "System Config",
    placeholder: (translatedCat: string) =>
      `Describe your ${translatedCat.toLowerCase()} concern...`,
    selectCategory: "Select a wellness category",
    status: "Status",
    assistantName: "Holistic AI Assistant",
    initialPrompt:
      "Select an optimization pathway below to begin telemetry sync.",
    initMessage: (name: string) => `Initializing ${name} Wellness Protocol.`,
    categories: {
      Physical: "Physical",
      Mental: "Mental",
      Emotional: "Emotional",
      Environmental: "Environmental",
    },
  },
  am: {
    systemLoad: "የስርዓት ጭነት",
    focusCapacity: "የትኩረት አቅም",
    ocularStrain: "የዓይን ድካም",
    hardwareConfig: "የሃርድዌር ውቅር",
    hoursCoded: "ዛሬ የሰራሁት ሰዓት",
    stackFocus: "የስታክ ትኩረት",
    systemLang: "የስርዓት ቋንቋ",
    reset: "ዳግም አስጀምር",
    systemConfig: "የስርዓት ውቅር",
    placeholder: (translatedCat: string) => `${translatedCat} ስጋትዎን ይግለጹ...`,
    selectCategory: "የጤና ዘርፍ ይምረጡ",
    status: "ሁኔታ",
    assistantName: "Holistic AI ረዳት",
    initialPrompt: "የቴሌሜትሪ ማመሳሰል ለመጀመር ከታች ያለውን የማመቻቸት መንገድ ይምረጡ።",
    initMessage: (name: string) => `${name} የጤና ፕሮቶኮል በመጀመር ላይ።`,
    categories: {
      Physical: "አካላዊ",
      Mental: "አእምሮአዊ",
      Emotional: "ስሜታዊ",
      Environmental: "አካባቢያዊ",
    },
  },
};

// --- 2. SHARED COMPONENT (ConfigPanel) ---
function ConfigPanel({ config, setConfig, metrics, t }: ConfigPanelProps) {
  return (
    <div className="space-y-6">
      <div className="p-5 bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 rounded-[2rem] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">
            {t.systemLoad}
          </span>
          <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span>{t.focusCapacity}</span>
              <span>{metrics.focusCapacity}%</span>
            </div>
            <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${metrics.focusCapacity}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span>{t.ocularStrain}</span>
              <span
                className={metrics.ocularStrain > 50 ? "text-orange-500" : ""}
              >
                {metrics.ocularStrain}%
              </span>
            </div>
            <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  metrics.ocularStrain > 50 ? "bg-orange-500" : "bg-blue-500"
                }`}
                style={{ width: `${metrics.ocularStrain}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-[2rem] space-y-4">
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
          <Cpu className="h-3 w-3" /> {t.hardwareConfig}
        </div>
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-zinc-500">{t.hoursCoded}</label>
            <input
              type="range"
              min="1"
              max="12"
              value={config.hoursCoded}
              onChange={(e) =>
                setConfig({ ...config, hoursCoded: parseInt(e.target.value) })
              }
              className="accent-emerald-500 h-1 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
              <span>1h</span>
              <span>{config.hoursCoded}h</span>
              <span>12h</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <label className="text-[9px] text-zinc-500">{t.stackFocus}</label>
            <select
              value={config.stack}
              onChange={(e) => setConfig({ ...config, stack: e.target.value })}
              className="bg-transparent text-xs border-none focus:ring-0 text-emerald-500 p-0 cursor-pointer"
            >
              <option>Full Stack</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>DevOps</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <label className="text-[9px] text-zinc-500">{t.systemLang}</label>
            <select
              value={config.language}
              onChange={(e) =>
                setConfig({ ...config, language: e.target.value })
              }
              className="bg-transparent text-xs border-none focus:ring-0 text-emerald-500 p-0 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ (Amharic)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. MAIN PAGE ---
export default function DemoPage() {
  const [issue, setIssue] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<ConfigState>({
    stack: "Full Stack",
    os: "MacOS",
    hoursCoded: 4,
    theme: "Dark",
    language: "en",
  });

  // Dynamic dictionary based on state
  const t = config.language === "am" ? translations.am : translations.en;
  const translatedCategory = category
    ? t.categories[category as keyof typeof t.categories] || category
    : "";
  const metrics = calculateDeveloperMetrics(config.hoursCoded, config.stack);

  const [chat, setChat] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: `### SYSTEM ONLINE\n**HolisticAI** is active. Environment: **${config.stack}**.\n\n${t.initialPrompt}`,
    },
  ]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const handleCategorySelect = (selectedCat: string) => {
    setCategory(selectedCat);

    // my translated category name
    const translatedName =
      t.categories[selectedCat as keyof typeof t.categories] || selectedCat;

    // message using the template from my dictionary
    setChat((prev) => [
      ...prev,
      {
        role: "user",
        // handling both languages
        content: t.initMessage(translatedName),
      },
    ]);
  };

  const handleReset = () => {
    setCategory(null);
    setIssue("");
    setChat([
      {
        role: "assistant",
        content: `### Protocol Reset.\nStanding by for new wellness category selection.`,
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
    setChat((prev) => [...prev, { role: "assistant", content: "" }]);

    let fullResponse = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          issue: userMessage,
          userContext: config,
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;

        setChat((prev) => {
          const newChat = [...prev];
          newChat[newChat.length - 1].content = fullResponse;
          return newChat;
        });
      }

      await saveConversation(
        "anonymous-session",
        category,
        userMessage,
        fullResponse
      );
    } catch (error) {
      console.error("Stream failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden font-mono">
      {/* Mobile Drawer */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSettingsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[300px] bg-white dark:bg-zinc-950 border-l border-zinc-800 p-6 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                {t.systemConfig}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(false)}
              >
                ×
              </Button>
            </div>
            <ConfigPanel
              config={config}
              setConfig={setConfig}
              metrics={metrics}
              t={t}
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
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
                    className={`max-w-[90%] px-6 py-5 rounded-[2rem] shadow-sm ${
                      msg.role === "user"
                        ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-none"
                        : "bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 text-neutral-800 dark:text-zinc-200 rounded-tl-none"
                    }`}
                  >
                    <div className="w-full text-left text-[13px] leading-relaxed">
                      <ReactMarkdown
                        components={{
                          div: ({ className, children }) =>
                            className === "disclaimer" ? (
                              <div className="my-4 p-3 border-l-2 border-emerald-500 bg-emerald-500/5 text-zinc-500 text-[10px] uppercase tracking-wider leading-normal">
                                {children}
                              </div>
                            ) : (
                              <div className="w-full">{children}</div>
                            ),
                          h3: ({ children }) => (
                            <h3 className="text-emerald-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 mt-2">
                              {children}
                            </h3>
                          ),
                          strong: ({ children }) => (
                            <span className="text-emerald-400 font-mono font-medium">
                              {children}
                            </span>
                          ),
                          p: ({ children }) => (
                            <p className="text-zinc-400 mb-4 last:mb-0 w-full break-words leading-relaxed">
                              {children}
                            </p>
                          ),
                          li: ({ children }) => (
                            <li className="flex gap-2 items-start mb-3 text-zinc-400 group">
                              <span className="text-emerald-500 font-bold">
                                ›
                              </span>
                              <div className="flex-1 text-[12px] font-mono leading-normal break-words">
                                {children}
                              </div>
                            </li>
                          ),
                          ul: ({ children }) => (
                            <ul className="pl-0 mb-6 w-full flex flex-col items-stretch">
                              {children}
                            </ul>
                          ),
                          hr: () => <hr className="border-zinc-800 my-6" />,
                          code: ({ children }) => (
                            <code className="bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded text-zinc-400 font-mono border border-zinc-700">
                              {children}
                            </code>
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
                // Remove or widen the parent container (max-w-...) if it feels too narrow
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-6 w-full">
                  {Object.entries(t.categories).map(([key, label], index) => {
                    const config =
                      categoryConfig[key as keyof typeof categoryConfig];
                    const Icon = config.icon;

                    return (
                      <button
                        key={key}
                        onClick={() => handleCategorySelect(key)}
                        className="group relative flex flex-col justify-between p-5
            aspect-square sm:aspect-square lg:aspect-auto lg:h-40
            bg-white dark:bg-zinc-900 
            border border-zinc-200 dark:border-zinc-800 
            rounded-2xl transition-all duration-300
            hover:border-emerald-500/50 hover:bg-emerald-500/[0.02]
            text-left" // Ensure text is left-aligned, not centered
                      >
                        {/* Header area */}
                        <div className="flex justify-between items-start">
                          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:text-emerald-500 transition-colors">
                            <Icon size={18} strokeWidth={1.5} />
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-emerald-500/70 transition-colors">
                            0{index + 1}
                          </span>
                        </div>

                        {/* Label area */}
                        <div className="flex flex-col">
                          <span className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                            {label}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">
                            {config.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
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

        <aside className="hidden xl:flex flex-col w-80 border-l border-neutral-100 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 p-6 space-y-6">
          <ConfigPanel
            config={config}
            setConfig={setConfig}
            metrics={metrics}
            t={t}
          />
          <div className="mt-auto p-4 border border-dashed border-emerald-500/20 rounded-2xl bg-emerald-500/5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-bold text-emerald-500 uppercase">
                {t.status}: {metrics.burnoutRisk}
              </span>
              <Zap
                className={`h-3 w-3 ${
                  metrics.burnoutRisk === "Critical"
                    ? "text-red-500"
                    : "text-emerald-500"
                }`}
              />
            </div>
            <p className="text-[9px] text-emerald-600/80 leading-relaxed italic">
              {metrics.statusMessage}
            </p>
          </div>
        </aside>
      </div>

      <div className="p-4 border-t border-neutral-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative flex items-end"
        >
          <Textarea
            disabled={!category}
            // Now we use the resolved translatedCategory string
            placeholder={
              category ? t.placeholder(translatedCategory) : t.selectCategory
            }
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="min-h-[60px] resize-none pr-14 py-4 rounded-2xl bg-neutral-50 dark:bg-zinc-900 border-neutral-200 dark:border-zinc-800 focus-visible:ring-emerald-500"
          />
          <Button
            type="submit"
            disabled={loading || !issue || !category}
            size="icon"
            className="absolute right-2 bottom-2 rounded-xl h-10 w-10 bg-emerald-600 hover:bg-emerald-700"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-neutral-400 dark:text-zinc-600 mt-3 tracking-widest uppercase">
          {t.assistantName}
        </p>
      </div>
    </div>
  );
}
