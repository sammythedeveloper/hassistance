// src/lib/telemetry.ts

export type Category = "Physical" | "Mental" | "Emotional" | "Environmental";
export type ProfessionalRole =
  | "FullStack"
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "UIUX"
  | "Student";
export type ActivityState = "Coding" | "JobHunting" | "Learning";

export interface TelemetryMetrics {
  // --- Legacy Support ---
  ocularStrain: number;
  hoursCoded: number;
  focusCapacity: number;

  // --- Physical: Real-World Ergonomics ---
  ergonomicScore: number; // 0-100
  screenTimeHours: number; // 0-100 (Relative)
  sleepQuality: number; // 0-100
  hydrationIndex: number; // 0-100
  physicalActivity: number; // 0-100

  // --- Mental: Cognitive Load ---
  contextSwitches: number; // 0-100
  decisionFatigue: number; // 0-100
  techComplexity: number; // 0-100
  imposterScore: number; // 0-100
  deadlinePressure: number; // 0-100

  // --- Emotional: Resilience & Burnout ---
  resilienceBaseline: number; // 0-100
  socialIsolation: number; // 0-100
  burnoutVelocity: number; // 0-100
  validationSeeking: number; // 0-100
  boundaryFunction: number; // 0-100

  // --- Environmental: Workspace Entropy ---
  noiseFloor: number; // 0-100
  sensoryClutter: number; // 0-100
  interruptionFreq: number; // 0-100
  lightAlignment: number; // 0-100
  biophilicAccess: number; // 0-100

  // --- System Metadata ---
  burnoutRisk: "Low" | "Moderate" | "High" | "Critical";
  statusMessage: string;
}

export function calculateDeveloperMetrics(
  category: Category,
  role: ProfessionalRole,
  state: ActivityState,
  inputs: Partial<TelemetryMetrics>
): TelemetryMetrics {
  // Merge inputs with defaults (0-100 scale)
  const m: TelemetryMetrics = {
    ocularStrain: inputs.ocularStrain || 0,
    hoursCoded: inputs.hoursCoded || 0,
    focusCapacity: inputs.focusCapacity || 0,
    ergonomicScore: inputs.ergonomicScore || 0,
    screenTimeHours: inputs.screenTimeHours || 0,
    sleepQuality: inputs.sleepQuality || 0,
    hydrationIndex: inputs.hydrationIndex || 0,
    physicalActivity: inputs.physicalActivity || 0,
    contextSwitches: inputs.contextSwitches || 0,
    decisionFatigue: inputs.decisionFatigue || 0,
    techComplexity: inputs.techComplexity || 0,
    imposterScore: inputs.imposterScore || 0,
    deadlinePressure: inputs.deadlinePressure || 0,
    resilienceBaseline: inputs.resilienceBaseline || 0,
    socialIsolation: inputs.socialIsolation || 0,
    burnoutVelocity: inputs.burnoutVelocity || 0,
    validationSeeking: inputs.validationSeeking || 0,
    boundaryFunction: inputs.boundaryFunction || 0,
    noiseFloor: inputs.noiseFloor || 0,
    sensoryClutter: inputs.sensoryClutter || 0,
    interruptionFreq: inputs.interruptionFreq || 0,
    lightAlignment: inputs.lightAlignment || 0,
    biophilicAccess: inputs.biophilicAccess || 0,
    burnoutRisk: "Low",
    statusMessage: "System nominal.",
  };

  // Logic: Calculate weighted risk score based on category (0-100 scale)
  let riskScore = 0;

  if (category === "Physical") {
    // Example: (Poor Ergonomics * 0.3) + (High Screen Time * 0.2) + (Poor Sleep * 0.5)
    riskScore =
      (100 - m.ergonomicScore) * 0.3 +
      m.screenTimeHours * 0.2 +
      (100 - m.sleepQuality) * 0.5;
  } else if (category === "Mental") {
    riskScore =
      m.imposterScore * 0.4 +
      m.decisionFatigue * 0.3 +
      m.deadlinePressure * 0.3;
  } else if (category === "Emotional") {
    riskScore =
      m.burnoutVelocity * 0.5 +
      m.socialIsolation * 0.3 +
      (100 - m.resilienceBaseline) * 0.2;
  } else {
    riskScore = 20; // Default baseline
  }

  // Assign Risk Tier
  m.burnoutRisk = riskScore > 70 ? "Critical" : riskScore > 40 ? "High" : "Low";

  // Status feedback
  if (m.burnoutRisk === "Critical") {
    m.statusMessage = "CRITICAL: Immediate decompression protocol recommended.";
  } else if (m.burnoutRisk === "High") {
    m.statusMessage = "WARNING: Burnout velocity increasing.";
  } else {
    m.statusMessage = "System nominal. Optimal flow state detected.";
  }

  return m;
}
