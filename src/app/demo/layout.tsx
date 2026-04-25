"use client";

import { useState, useContext } from "react";
import { useParams } from "next/navigation";
import { ConfigProvider, ConfigContext } from "@/context/ConfigContext";
import { TelemetryMetrics, Category } from "@/lib/telemetry";
import { Button } from "@/components/ui/button";
import { Cpu, Settings, Settings2, X } from "lucide-react";

function SidebarContent() {
  const { config, setConfig } = useContext(ConfigContext);
  const params = useParams();

  const rawCategory = (params.category as string) || "Physical";
  const category = (rawCategory.charAt(0).toUpperCase() +
    rawCategory.slice(1)) as Category;

  // Direct helper to update metrics in the nested object
  const updateMetric = (key: keyof TelemetryMetrics, val: number) => {
    setConfig({
      ...config,
      metrics: {
        ...(config.metrics || {}),
        [key]: val,
      } as TelemetryMetrics,
    });
  };

  const renderSliders = () => {
    switch (category) {
      case "Physical":
        return (
          <>
            {[
              { label: "Ergonomic Score", key: "ergonomicScore" },
              { label: "Screen Time", key: "screenTimeHours" },
              { label: "Sleep Quality", key: "sleepQuality" },
              { label: "Hydration", key: "hydrationIndex" },
              { label: "Physical Activity", key: "physicalActivity" },
            ].map((m) => (
              <div key={m.key} className="flex flex-col gap-1">
                <label className="text-[9px] text-zinc-500">{m.label}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.metrics?.[m.key as keyof TelemetryMetrics] || 0}
                  onChange={(e) =>
                    updateMetric(
                      m.key as keyof TelemetryMetrics,
                      parseInt(e.target.value)
                    )
                  }
                  className="accent-emerald-500 h-1 cursor-pointer w-full"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                  <span>0%</span>
                  <span>
                    {config.metrics?.[m.key as keyof TelemetryMetrics] || 0}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </>
        );

      case "Mental":
        return (
          <>
            {[
              { label: "Context Switches", key: "contextSwitches" },
              { label: "Decision Fatigue", key: "decisionFatigue" },
              { label: "Tech Complexity", key: "techComplexity" },
              { label: "Imposter Score", key: "imposterScore" },
              { label: "Deadline Pressure", key: "deadlinePressure" },
            ].map((m) => (
              <div key={m.key} className="flex flex-col gap-1">
                <label className="text-[9px] text-zinc-500">{m.label}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.metrics?.[m.key as keyof TelemetryMetrics] || 0}
                  onChange={(e) =>
                    updateMetric(
                      m.key as keyof TelemetryMetrics,
                      parseInt(e.target.value)
                    )
                  }
                  className="accent-emerald-500 h-1 cursor-pointer w-full"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                  <span>0%</span>
                  <span>
                    {config.metrics?.[m.key as keyof TelemetryMetrics] || 0}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </>
        );

      case "Emotional":
        return (
          <>
            {[
              { label: "Resilience Baseline", key: "resilienceBaseline" },
              { label: "Social Isolation", key: "socialIsolation" },
              { label: "Burnout Velocity", key: "burnoutVelocity" },
              { label: "Validation Seeking", key: "validationSeeking" },
              { label: "Boundary Function", key: "boundaryFunction" },
            ].map((m) => (
              <div key={m.key} className="flex flex-col gap-1">
                <label className="text-[9px] text-zinc-500">{m.label}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.metrics?.[m.key as keyof TelemetryMetrics] || 0}
                  onChange={(e) =>
                    updateMetric(
                      m.key as keyof TelemetryMetrics,
                      parseInt(e.target.value)
                    )
                  }
                  className="accent-emerald-500 h-1 cursor-pointer w-full"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                  <span>0%</span>
                  <span>
                    {config.metrics?.[m.key as keyof TelemetryMetrics] || 0}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </>
        );

      case "Environmental":
        return (
          <>
            {[
              { label: "Noise Floor", key: "noiseFloor" },
              { label: "Sensory Clutter", key: "sensoryClutter" },
              { label: "Interruption Freq", key: "interruptionFreq" },
              { label: "Light Alignment", key: "lightAlignment" },
              { label: "Biophilic Access", key: "biophilicAccess" },
            ].map((m) => (
              <div key={m.key} className="flex flex-col gap-1">
                <label className="text-[9px] text-zinc-500">{m.label}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.metrics?.[m.key as keyof TelemetryMetrics] || 0}
                  onChange={(e) =>
                    updateMetric(
                      m.key as keyof TelemetryMetrics,
                      parseInt(e.target.value)
                    )
                  }
                  className="accent-emerald-500 h-1 cursor-pointer w-full"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                  <span>0%</span>
                  <span>
                    {config.metrics?.[m.key as keyof TelemetryMetrics] || 0}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="p-5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-[2rem] space-y-4">
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
          <Settings className="h-3 w-3" /> System Config
        </div>
        <div className="space-y-3">
          <label className="text-[9px] text-zinc-500">Professional Role</label>
          <select
            className="bg-transparent text-xs text-emerald-500 w-full"
            value={config.role || "FullStack"}
            onChange={(e) => setConfig({ ...config, role: e.target.value })}
          >
            <option>FullStack</option>
            <option>Frontend</option>
            <option>Backend</option>
          </select>
        </div>
      </div>
      <div className="p-5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-[2rem] space-y-4">
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
          <Cpu className="h-3 w-3" /> {category} Metrics
        </div>
        <div className="space-y-4">{renderSliders()}</div>
      </div>
    </div>
  );
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <ConfigProvider>
      <div className="flex h-screen bg-zinc-950 font-mono text-white">
        {/* Mobile Drawer Overlay */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSettingsOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-[300px] bg-white dark:bg-zinc-950 border-l border-zinc-800 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-zinc-800">
                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                  System Config
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden relative">
          {/* Mobile Header Toggle */}
          <div className="xl:hidden absolute top-4 right-4 z-40">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings2 className="h-5 w-5" />
            </Button>
          </div>
          {children}
        </main>

        {/* Desktop Sidebar */}
        <aside className="hidden xl:flex flex-col w-80 border-l border-zinc-800">
          <SidebarContent />
        </aside>
      </div>
    </ConfigProvider>
  );
}
