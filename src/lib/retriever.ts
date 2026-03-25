// src/lib/retriever.ts
import { KNOWLEDGE_BASE, Protocol } from "./knowledge-base";
import { TelemetryMetrics } from "./telemetry";

export function retrieveRelevantProtocols(
  metrics: TelemetryMetrics
): Protocol[] {
  return KNOWLEDGE_BASE.filter((p) => {
    const userValue = metrics[p.metric as keyof TelemetryMetrics];

    if (p.condition === "above") {
      return (userValue as number) >= p.threshold;
    } else {
      return (userValue as number) <= p.threshold;
    }
  }).slice(0, 2);
}
