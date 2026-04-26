"use client";

import type { Dispatch, SetStateAction } from "react";
import type {
  CategoryMetricOverrides,
  TelemetryMetrics,
} from "@/lib/telemetry";
import { PanelShell } from "./PanelShell";

interface MentalPanelProps {
  metrics: TelemetryMetrics;
  categoryInputs: CategoryMetricOverrides;
  setCategoryInputs: Dispatch<SetStateAction<CategoryMetricOverrides>>;
}

export function MentalPanel({
  metrics,
  categoryInputs,
  setCategoryInputs,
}: MentalPanelProps) {
  const mental = categoryInputs?.mental ?? {
    focusCapacity: metrics.mental.focusCapacity,
    cognitiveLoad: metrics.mental.cognitiveLoad,
    contextSwitchRate: metrics.mental.contextSwitchRate,
  };

  const update = (key: string, value: number) => {
    setCategoryInputs((prev) => ({
      ...prev,
      mental: {
        ...(prev.mental ?? {}),
        [key]: value,
      },
    }));
  };

  return (
    <PanelShell title="Mental System">
      <div className="space-y-4 text-xs text-zinc-500">
        {[
          ["focusCapacity", "Focus Capacity"],
          ["cognitiveLoad", "Cognitive Load"],
          ["contextSwitchRate", "Context Switch"],
        ].map(([key, label]) => {
          const value = mental[key as keyof typeof mental] ?? 0;
          return (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span>{label}</span>
                <span>{value}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => update(key, Number(e.target.value))}
                className="w-full"
              />
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}
