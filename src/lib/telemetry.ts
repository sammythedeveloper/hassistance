// src/lib/telemetry.ts

export type StackFocus = "Full Stack" | "Frontend" | "Backend" | "DevOps";

/* -------------------- PHYSICAL -------------------- */
export interface PhysicalMetrics {
  ocularStrain: number;
  postureLoad: number;
  breakDeficit: number;
}

/* -------------------- MENTAL -------------------- */
export interface MentalMetrics {
  focusCapacity: number;
  cognitiveLoad: number;
  contextSwitchRate: number;
}

/* -------------------- EMOTIONAL -------------------- */
export interface EmotionalMetrics {
  stressIndex: number;
  frustrationLevel: number;
  burnoutSentiment: number;
}

/* -------------------- ENVIRONMENTAL -------------------- */
export interface EnvironmentalMetrics {
  workspaceScore: number;
  noiseDistractionIndex: number;
  screenTimeQuality: number;
}

/* -------------------- FULL SYSTEM -------------------- */
export interface TelemetryMetrics {
  physical: PhysicalMetrics;
  mental: MentalMetrics;
  emotional: EmotionalMetrics;
  environmental: EnvironmentalMetrics;

  // global summary (useful for Gemini + UI)
  burnoutRisk: "Low" | "Moderate" | "High" | "Critical";
  statusMessage: string;
}
export function calculateDeveloperMetrics(
  hours: number,
  stack: string
): TelemetryMetrics {
  const strain = Math.min(hours * 12, 100);

  const focus = Math.max(100 - hours * 8, 0);

  const weightedHours =
    ["Backend", "DevOps"].includes(stack) ? hours * 1.3 : hours;

  /* ---------------- PHYSICAL ---------------- */
  const physical: PhysicalMetrics = {
    ocularStrain: strain,
    postureLoad: Math.min(hours * 10, 100),
    breakDeficit: Math.max(hours - 2, 0) * 15,
  };

  /* ---------------- MENTAL ---------------- */
  const mental: MentalMetrics = {
    focusCapacity: focus,
    cognitiveLoad: Math.min(hours * 9, 100),
    contextSwitchRate: Math.min(hours * 6, 100),
  };

  /* ---------------- EMOTIONAL ---------------- */
  const emotional: EmotionalMetrics = {
    stressIndex: Math.min(weightedHours * 10, 100),
    frustrationLevel: Math.min(hours * 8, 100),
    burnoutSentiment: Math.min(hours * 7 + strain * 0.5, 100),
  };

  /* ---------------- ENVIRONMENTAL ---------------- */
  const environmental: EnvironmentalMetrics = {
    workspaceScore: Math.max(100 - hours * 5, 0),
    noiseDistractionIndex: Math.min(hours * 6, 100),
    screenTimeQuality: Math.max(100 - strain * 0.6, 0),
  };

  /* ---------------- GLOBAL RISK ---------------- */
  let risk: TelemetryMetrics["burnoutRisk"] = "Low";
  let message = "System nominal. Optimal output detected.";

  const avgStress =
    (emotional.stressIndex +
      mental.cognitiveLoad +
      physical.ocularStrain) / 3;

  if (avgStress > 75) {
    risk = "Critical";
    message = "CRITICAL: System overload detected. Immediate rest required.";
  } else if (avgStress > 55) {
    risk = "High";
    message = "High strain detected. Reduce workload intensity.";
  } else if (avgStress > 35) {
    risk = "Moderate";
    message = "Moderate load. Maintain recovery cycles.";
  }

  return {
    physical,
    mental,
    emotional,
    environmental,
    burnoutRisk: risk,
    statusMessage: message,
  };
}