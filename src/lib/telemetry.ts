// src/lib/telemetry.ts

export type Category =
  | "physical"
  | "mental"
  | "emotional"
  | "environmental";

export type Severity = "Low" | "Moderate" | "High" | "Critical";

export interface DomainStatus {
  severity: Severity;
  label: string;
  statusMessage: string;
}

export interface BaseConfig {
  stack: string;
  hoursCoded: number;
}

/**
 * Direct user inputs for each category.
 */
export interface CategoryMetrics {
  physical: {
    postureLoad: number;
    hydrationDeficit: number;
    circulationRisk: number;
  };

  mental: {
    focusCapacity: number;
    cognitiveLoad: number;
    contextSwitchRate: number;
  };

  emotional: {
    stressIndex: number;
    frustrationLevel: number;
    recoveryDebt: number;
  };

  environmental: {
    noiseDistractionIndex: number;
    lightingStrain: number;
    workspaceErgonomics: number;
  };
}

/**
 * Derived cause-effect system load values shown in the sidebar.
 */
export interface SystemLoadMetrics {
  physical: {
    bodyStrain: number;
    recoveryCapacity: number;
  };
  mental: {
    sustainedAttention: number;
    decisionFatigue: number;
  };
  emotional: {
    emotionalStability: number;
    escalationRisk: number;
  };
  environmental: {
    sensoryLoad: number;
    focusSupport: number;
  };
}

export type CategoryMetricOverrides = {
  [K in keyof CategoryMetrics]?: Partial<CategoryMetrics[K]>;
};

export interface TelemetryMetrics extends CategoryMetrics {
  systemLoad: SystemLoadMetrics;
  status: {
    physical: DomainStatus;
    mental: DomainStatus;
    emotional: DomainStatus;
    environmental: DomainStatus;
  };
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function toHoursLoad(hoursCoded: number): number {
  const normalized = ((hoursCoded - 1) / 11) * 100;
  return clamp(normalized);
}

function getStackPressure(stack: string): number {
  const normalized = stack.toLowerCase();
  if (normalized === "devops") return 58;
  if (normalized === "backend") return 48;
  if (normalized === "full stack") return 38;
  if (normalized === "frontend") return 28;
  return 35;
}

function evaluatePhysical(
  input: CategoryMetrics["physical"],
  load: SystemLoadMetrics["physical"]
): DomainStatus {
  if (
    load.bodyStrain >= 85 ||
    load.recoveryCapacity <= 20 ||
    (input.hydrationDeficit >= 85 && input.circulationRisk >= 80)
  ) {
    return {
      severity: "Critical",
      label: "Musculoskeletal Overload",
      statusMessage:
        "CRITICAL: Combined posture, hydration, and circulation stress is unsafe. Stand, hydrate, and run a full body reset now.",
    };
  }

  if (
    load.bodyStrain >= 70 ||
    load.recoveryCapacity <= 35 ||
    (input.postureLoad >= 75 && input.circulationRisk >= 70)
  ) {
    return {
      severity: "High",
      label: "High Physical Strain",
      statusMessage:
        "High physical strain detected. Back/neck load and recovery limits are approaching breakdown.",
    };
  }

  if (
    load.bodyStrain >= 52 ||
    load.recoveryCapacity <= 55 ||
    input.hydrationDeficit >= 60
  ) {
    return {
      severity: "Moderate",
      label: "Recoverable Physical Load",
      statusMessage:
        "Moderate physical load. Schedule movement breaks and hydration before continuing intense work.",
    };
  }

  return {
    severity: "Low",
    label: "Physical State Stable",
    statusMessage:
      "Physical load is stable. Maintain posture hygiene, hydration, and regular movement.",
  };
}

function evaluateMental(
  input: CategoryMetrics["mental"],
  load: SystemLoadMetrics["mental"]
): DomainStatus {
  if (
    load.sustainedAttention <= 20 ||
    load.decisionFatigue >= 85 ||
    (input.contextSwitchRate >= 90 && input.cognitiveLoad >= 80)
  ) {
    return {
      severity: "Critical",
      label: "Cognitive Saturation",
      statusMessage:
        "CRITICAL: Attention collapse risk is high. Stop multitasking and run an immediate cognitive reset.",
    };
  }

  if (
    load.sustainedAttention <= 40 ||
    load.decisionFatigue >= 70 ||
    input.focusCapacity <= 35
  ) {
    return {
      severity: "High",
      label: "High Cognitive Load",
      statusMessage:
        "High mental pressure detected. Decision fatigue and switching overhead are reducing code quality.",
    };
  }

  if (load.sustainedAttention <= 60 || load.decisionFatigue >= 55) {
    return {
      severity: "Moderate",
      label: "Moderate Cognitive Fatigue",
      statusMessage:
        "Moderate cognitive fatigue. Narrow scope, reduce interruptions, and return to one objective.",
    };
  }

  return {
    severity: "Low",
    label: "Cognitive State Stable",
    statusMessage:
      "Cognitive state is stable. Focus and decision quality are within healthy range.",
  };
}

function evaluateEmotional(
  input: CategoryMetrics["emotional"],
  load: SystemLoadMetrics["emotional"]
): DomainStatus {
  if (
    load.emotionalStability <= 20 ||
    load.escalationRisk >= 85 ||
    (input.stressIndex >= 85 && input.recoveryDebt >= 80)
  ) {
    return {
      severity: "Critical",
      label: "Acute Emotional Strain",
      statusMessage:
        "CRITICAL: Emotional escalation is severe. Step away from high-friction tasks and recover before re-entry.",
    };
  }

  if (load.emotionalStability <= 40 || load.escalationRisk >= 70) {
    return {
      severity: "High",
      label: "Elevated Emotional Load",
      statusMessage:
        "High emotional load. Stress and recovery debt are compounding and reducing resilience.",
    };
  }

  if (load.emotionalStability <= 60 || load.escalationRisk >= 55) {
    return {
      severity: "Moderate",
      label: "Recoverable Emotional Fatigue",
      statusMessage:
        "Moderate emotional fatigue. Short decompression and pacing reset recommended.",
    };
  }

  return {
    severity: "Low",
    label: "Emotional Baseline Stable",
    statusMessage:
      "Emotional baseline is stable. Keep recovery cadence and load boundaries consistent.",
  };
}

function evaluateEnvironmental(
  input: CategoryMetrics["environmental"],
  load: SystemLoadMetrics["environmental"]
): DomainStatus {
  if (
    load.sensoryLoad >= 85 ||
    load.focusSupport <= 22 ||
    (input.noiseDistractionIndex >= 90 && input.lightingStrain >= 80)
  ) {
    return {
      severity: "Critical",
      label: "Hazardous Work Environment",
      statusMessage:
        "CRITICAL: Environment is actively harming focus and comfort. Relocate or reconfigure workspace immediately.",
    };
  }

  if (
    load.sensoryLoad >= 70 ||
    load.focusSupport <= 40 ||
    (input.workspaceErgonomics <= 35 &&
      (input.noiseDistractionIndex >= 60 || input.lightingStrain >= 60))
  ) {
    return {
      severity: "High",
      label: "Disruptive Environment",
      statusMessage:
        "High environmental disruption. Noise and lighting are undermining performance and recovery.",
    };
  }

  if (load.sensoryLoad >= 55 || load.focusSupport <= 60) {
    return {
      severity: "Moderate",
      label: "Suboptimal Environment",
      statusMessage:
        "Moderate environmental drag. Improve sensory control and workstation setup before longer sessions.",
    };
  }

  return {
    severity: "Low",
    label: "Workspace Supportive",
    statusMessage:
      "Environment is supportive. Current noise, lighting, and ergonomics are helping focus.",
  };
}

export function calculateDeveloperMetrics(
  base: BaseConfig,
  inputs: CategoryMetricOverrides = {}
): TelemetryMetrics {
  const hoursLoad = toHoursLoad(base.hoursCoded);
  const stackPressure = getStackPressure(base.stack);

  // ---------------- DIRECT INPUTS ----------------
  const physical = {
    postureLoad: clamp(inputs.physical?.postureLoad ?? 35),
    hydrationDeficit: clamp(inputs.physical?.hydrationDeficit ?? 30),
    circulationRisk: clamp(inputs.physical?.circulationRisk ?? 28),
  };

  const mental = {
    focusCapacity: clamp(inputs.mental?.focusCapacity ?? 72),
    cognitiveLoad: clamp(inputs.mental?.cognitiveLoad ?? 34),
    contextSwitchRate: clamp(inputs.mental?.contextSwitchRate ?? 30),
  };

  const emotional = {
    stressIndex: clamp(inputs.emotional?.stressIndex ?? 30),
    frustrationLevel: clamp(inputs.emotional?.frustrationLevel ?? 28),
    recoveryDebt: clamp(inputs.emotional?.recoveryDebt ?? 30),
  };

  const environmental = {
    noiseDistractionIndex: clamp(inputs.environmental?.noiseDistractionIndex ?? 30),
    lightingStrain: clamp(inputs.environmental?.lightingStrain ?? 26),
    workspaceErgonomics: clamp(inputs.environmental?.workspaceErgonomics ?? 74),
  };

  // ---------------- DERIVED CAUSE-EFFECT SYSTEM LOAD ----------------
  const physicalLoad = {
    bodyStrain: clamp(
      physical.postureLoad * 0.45 +
        physical.circulationRisk * 0.35 +
        hoursLoad * 0.2
    ),
    recoveryCapacity: clamp(
      100 -
        (physical.hydrationDeficit * 0.5 +
          physical.postureLoad * 0.25 +
          hoursLoad * 0.25)
    ),
  };

  const attentionPenalty = clamp(
    mental.cognitiveLoad * 0.45 +
      mental.contextSwitchRate * 0.35 +
      hoursLoad * 0.1 +
      stackPressure * 0.1
  );

  const mentalLoad = {
    sustainedAttention: clamp(
      mental.focusCapacity * 0.65 + (100 - attentionPenalty) * 0.35
    ),
    decisionFatigue: clamp(
      mental.cognitiveLoad * 0.4 +
        mental.contextSwitchRate * 0.3 +
        (100 - mental.focusCapacity) * 0.2 +
        hoursLoad * 0.05 +
        stackPressure * 0.05
    ),
  };

  const emotionalLoad = {
    emotionalStability: clamp(
      100 -
        (emotional.stressIndex * 0.4 +
          emotional.frustrationLevel * 0.25 +
          emotional.recoveryDebt * 0.25 +
          hoursLoad * 0.1)
    ),
    escalationRisk: clamp(
      emotional.stressIndex * 0.45 +
        emotional.frustrationLevel * 0.25 +
        emotional.recoveryDebt * 0.2 +
        mentalLoad.decisionFatigue * 0.1
    ),
  };

  const environmentalLoad = {
    sensoryLoad: clamp(
      environmental.noiseDistractionIndex * 0.5 +
        environmental.lightingStrain * 0.4 +
        hoursLoad * 0.1
    ),
    focusSupport: clamp(
      environmental.workspaceErgonomics * 0.5 +
        (100 - environmental.noiseDistractionIndex) * 0.3 +
        (100 - environmental.lightingStrain) * 0.2
    ),
  };

  return {
    physical,
    mental,
    emotional,
    environmental,
    systemLoad: {
      physical: physicalLoad,
      mental: mentalLoad,
      emotional: emotionalLoad,
      environmental: environmentalLoad,
    },
    status: {
      physical: evaluatePhysical(physical, physicalLoad),
      mental: evaluateMental(mental, mentalLoad),
      emotional: evaluateEmotional(emotional, emotionalLoad),
      environmental: evaluateEnvironmental(environmental, environmentalLoad),
    },
  };
}
