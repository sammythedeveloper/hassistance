"use client";

import type { Dispatch, SetStateAction } from "react";
import type {
  CategoryMetricOverrides,
  TelemetryMetrics,
} from "@/lib/telemetry";
import { PanelShell } from "./PanelShell";

interface EnvironmentalPanelProps {
  metrics: TelemetryMetrics;
  categoryInputs: CategoryMetricOverrides;
  setCategoryInputs: Dispatch<SetStateAction<CategoryMetricOverrides>>;
}

export function EnvironmentalPanel({
  metrics,
  categoryInputs,
  setCategoryInputs,
}: EnvironmentalPanelProps) {
  const env = categoryInputs?.environmental ?? {
    noiseDistractionIndex: metrics.environmental.noiseDistractionIndex,
    lightingStrain: metrics.environmental.lightingStrain,
    workspaceErgonomics: metrics.environmental.workspaceErgonomics,
  };

  const update = (key: string, value: number) => {
    setCategoryInputs((prev) => ({
      ...prev,
      environmental: {
        ...(prev.environmental ?? {}),
        [key]: value,
      },
    }));
  };

  return (
    <PanelShell title="Environmental System">
      <div className="space-y-4 text-xs text-zinc-500">
        {[
          ["noiseDistractionIndex", "Noise Level"],
          ["lightingStrain", "Lighting Strain"],
          ["workspaceErgonomics", "Workspace Ergonomics"],
        ].map(([key, label]) => {
          const value = env[key as keyof typeof env] ?? 0;
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
