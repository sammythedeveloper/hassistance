// src/lib/telemetry.ts

export type StackFocus = "Full Stack" | "Frontend" | "Backend" | "DevOps";

export interface TelemetryMetrics {
  focusCapacity: number;
  ocularStrain: number;
  hoursCoded: number;
  burnoutRisk: "Low" | "Moderate" | "High" | "Critical";
  statusMessage: string;
}

export function calculateDeveloperMetrics(
  hours: number,
  stack: string
): TelemetryMetrics {
  const focus = Math.max(100 - hours * 8, 0);
  const strain = Math.min(hours * 12, 100);

  // Logic: Some stacks are cognitively heavier (e.g., DevOps/Backend infra)
  const multiplier = ["Backend", "DevOps"].includes(stack) ? 1.3 : 1.0;
  const weightedHours = hours * multiplier;

  let risk: TelemetryMetrics["burnoutRisk"] = "Low";
  let message = "System nominal. Optimal output detected.";

  if (weightedHours > 10) {
    risk = "Critical";
    message = "CRITICAL: Brain-fog imminent. Immediate shutdown recommended.";
  } else if (weightedHours > 7) {
    risk = "High";
    message = "High Strain: Logic centers fatigued. Refactor your schedule.";
  } else if (weightedHours > 4) {
    risk = "Moderate";
    message = "Moderate Load: Hydration and posture check required.";
  }

  return {
    focusCapacity: focus,
    ocularStrain: strain,
    hoursCoded: hours,
    burnoutRisk: risk,
    statusMessage: message,
  };
}
