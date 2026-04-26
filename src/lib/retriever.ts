// src/lib/retrieval.ts

import { KNOWLEDGE_BASE, Protocol } from "./knowledge-base";
import { TelemetryMetrics, Category } from "./telemetry";

/**
 * Safely extracts a metric value from telemetry
 */
function getMetricValue(
  metrics: TelemetryMetrics,
  category: Category,
  metric: string
): number {
  const domain = metrics[category] as Record<string, number> | undefined;
  return domain?.[metric] ?? 0;
}

/**
 * Scoring logic:
 * - ABOVE condition → higher value = worse
 * - BELOW condition → lower value = worse
 */
function calculateScore(
  value: number,
  threshold: number,
  condition: "above" | "below"
): number {
  return condition === "above" ? value - threshold : threshold - value;
}

/**
 * Main retrieval engine
 * Returns top relevant protocols for a given category
 */
export function retrieveRelevantProtocols(
  metrics: TelemetryMetrics,
  category: Category
): Protocol[] {
  const candidates = KNOWLEDGE_BASE.filter((p) => p.category === category);

  const scored = candidates
    .map((protocol) => {
      const value = getMetricValue(metrics, protocol.category, protocol.metric);

      const score = calculateScore(
        value,
        protocol.threshold,
        protocol.condition
      );

      return {
        protocol,
        score,
      };
    })
    // only triggered / relevant interventions
    .filter((item) => item.score > 0)
    // highest severity first
    .sort((a, b) => b.score - a.score);

  // return top 3 most relevant interventions
  return scored.slice(0, 3).map((s) => s.protocol);
}
