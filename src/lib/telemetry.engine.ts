import { TelemetryMetrics, ProfessionalRole, ActivityState } from "./telemetry";

export function calculateMetrics(
  state: ActivityState,
  role: ProfessionalRole,
  rawInput: Partial<TelemetryMetrics>
): TelemetryMetrics {
  
  // 1. Initialize with defaults or provided values
  const metrics = { ...defaultMetrics, ...rawInput };

  // 2. Adjust Logic based on State (e.g., Job Hunter gets hit harder by Imposter Score)
  if (state === "JobHunting") {
    // Job hunters have higher emotional vulnerability
    metrics.imposterScore *= 1.5; 
    metrics.validationSeeking *= 1.8;
  }

  // 3. Adjust Logic based on Role (e.g., DevOps has higher Context Switching)
  if (role === "DevOps" || role === "FullStack") {
    metrics.contextSwitches *= 1.4;
    metrics.techComplexity *= 1.2;
  }

  return metrics;
}