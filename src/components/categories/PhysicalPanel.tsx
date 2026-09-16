"use client";

import type { Dispatch, SetStateAction } from "react";
import type {
  CategoryMetricOverrides,
  TelemetryMetrics,
} from "@/lib/telemetry";
import { PanelShell } from "./PanelShell";

interface PhysicalPanelProps {
  metrics: TelemetryMetrics;
  categoryInputs: CategoryMetricOverrides;
  setCategoryInputs: Dispatch<SetStateAction<CategoryMetricOverrides>>;
}

export function PhysicalPanel({
  metrics,
  categoryInputs,
  setCategoryInputs,
}: PhysicalPanelProps) {
  const physical = categoryInputs?.physical ?? {
    postureLoad: metrics.physical.postureLoad,
    hydrationDeficit: metrics.physical.hydrationDeficit,
    circulationRisk: metrics.physical.circulationRisk,
  };

  const update = (key: string, value: number) => {
    setCategoryInputs((prev) => ({
      ...prev,
      physical: {
        ...(prev.physical ?? {}),
        [key]: value,
      },
    }));
  };

  return (
    <PanelShell title="Physical System">
      <div className="space-y-4 text-xs text-zinc-500">
        {[
          ["postureLoad", "Posture Load"],
          ["hydrationDeficit", "Hydration Deficit"],
          ["circulationRisk", "Circulation Risk"],
        ].map(([key, label]) => {
          const value = physical[key as keyof typeof physical] ?? 0;
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
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}
