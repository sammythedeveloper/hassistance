export interface DeveloperConfig {
  hoursCoded: number;
  stack: string;
  os: string;
}

export interface HealthMetrics {
  ocularStrain: number; // 0 to 100
  cognitiveLoad: number; // 0 to 100
  postureRisk: "Low" | "Moderate" | "High" | "Critical";
}

export function calculateDeveloperMetrics(
  config: DeveloperConfig
): HealthMetrics {
  // Logic: Ocular strain increases by 12% every hour, capped at 100
  const ocularStrain = Math.min(config.hoursCoded * 12, 100);

  // Logic: Cognitive load varies by stack complexity
  const stackMultiplier =
    config.stack === "C++" || config.stack === "Rust" ? 1.5 : 1.0;
  const cognitiveLoad = Math.min(config.hoursCoded * 10 * stackMultiplier, 100);

  // Logic: Posture risk becomes critical after 6 hours
  let postureRisk: HealthMetrics["postureRisk"] = "Low";
  if (config.hoursCoded > 8) postureRisk = "Critical";
  else if (config.hoursCoded > 6) postureRisk = "High";
  else if (config.hoursCoded > 3) postureRisk = "Moderate";

  return { ocularStrain, cognitiveLoad, postureRisk };
}
