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
  const physical = categoryInputs.physical ?? {};

  const update = (key: string, value: number) => {
    setCategoryInputs((prev) => ({
      ...prev,
      physical: {
        ...prev.physical,
        [key]: value,
      },
    }));
  };

  return (
    <PanelShell title="Physical System">
      <div className="space-y-4 text-xs">
        {/* Posture Load */}
        <div>
          <div className="flex justify-between">
            <span>Posture Load</span>
            <span>{metrics.physical.postureLoad}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={physical.postureLoad ?? metrics.physical.postureLoad}
            onChange={(e) => update("postureLoad", Number(e.target.value))}
          />
        </div>

        {/* Hydration Deficit */}
        <div>
          <div className="flex justify-between">
            <span>Hydration Deficit</span>
            <span>{metrics.physical.hydrationDeficit}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={
              physical.hydrationDeficit ?? metrics.physical.hydrationDeficit
            }
            onChange={(e) => update("hydrationDeficit", Number(e.target.value))}
          />
        </div>

        {/* Circulation Risk */}
        <div>
          <div className="flex justify-between">
            <span>Circulation Risk</span>
            <span>{metrics.physical.circulationRisk}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={physical.circulationRisk ?? metrics.physical.circulationRisk}
            onChange={(e) => update("circulationRisk", Number(e.target.value))}
          />
        </div>
      </div>
    </PanelShell>
  );
}
