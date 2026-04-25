import { KNOWLEDGE_BASE, Protocol, Category } from "./knowledge-base";
import { TelemetryMetrics } from "./telemetry";

function getSignalValue(
  metrics: TelemetryMetrics,
  category: Category,
  signal: string
): number {
  const domain = metrics[category] as Record<string, number>;
  return domain?.[signal] ?? 0;
}

function calculateScore(
  value: number,
  threshold: number,
  condition: "above" | "below"
): number {
  if (condition === "above") {
    return value - threshold;
  } else {
    return threshold - value;
  }
}

export function retrieveRelevantProtocols(
  metrics: TelemetryMetrics,
  category: Category
): Protocol[] {
  const candidates = KNOWLEDGE_BASE.filter((p) => p.category === category);

  const scored = candidates
    .map((p) => {
      const value = getSignalValue(metrics, p.category, p.signal);

      const score = calculateScore(value, p.threshold, p.condition);

      return {
        protocol: p,
        score,
        value,
      };
    })
    .filter((item) => item.score > 0) // only triggered ones
    .sort((a, b) => b.score - a.score); // highest severity first

  return scored.slice(0, 3).map((s) => s.protocol);
}
