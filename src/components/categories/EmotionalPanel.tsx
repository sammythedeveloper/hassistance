"use client";

import type { Dispatch, SetStateAction } from "react";
import type {
  CategoryMetricOverrides,
  TelemetryMetrics,
} from "@/lib/telemetry";
import { PanelShell } from "./PanelShell";

interface EmotionalPanelProps {
  metrics: TelemetryMetrics;
  categoryInputs: CategoryMetricOverrides;
  setCategoryInputs: Dispatch<SetStateAction<CategoryMetricOverrides>>;
}

export function EmotionalPanel({
  metrics,
  categoryInputs,
  setCategoryInputs,
}: EmotionalPanelProps) {
  const emotional = categoryInputs?.emotional ?? {
    stressIndex: metrics.emotional.stressIndex,
    frustrationLevel: metrics.emotional.frustrationLevel,
    recoveryDebt: metrics.emotional.recoveryDebt,
  };

  const update = (key: string, value: number) => {
    setCategoryInputs((prev) => ({
      ...prev,
      emotional: {
        ...(prev.emotional ?? {}),
        [key]: value,
      },
    }));
  };

  return (
    <PanelShell title="Emotional System">
      <div className="space-y-4 text-xs text-zinc-500">
        {[
          ["stressIndex", "Stress Index"],
          ["frustrationLevel", "Frustration"],
          ["recoveryDebt", "Recovery Debt"],
        ].map(([key, label]) => {
          const value = emotional[key as keyof typeof emotional] ?? 0;
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
