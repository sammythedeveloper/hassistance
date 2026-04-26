// src/lib/knowledge-base.ts

import { Category } from "./telemetry";

export interface Protocol {
  id: string;
  category: Category;

  metric:
    | "postureLoad"
    | "hydrationDeficit"
    | "circulationRisk"
    | "focusCapacity"
    | "cognitiveLoad"
    | "contextSwitchRate"
    | "stressIndex"
    | "frustrationLevel"
    | "recoveryDebt"
    | "noiseDistractionIndex"
    | "lightingStrain"
    | "workspaceErgonomics";

  threshold: number;
  condition: "above" | "below";

  title: string;
  content: string;
  source: string;
}

/**
 * Knowledge Base = intervention rules triggered by telemetry signals
 */
export const KNOWLEDGE_BASE: Protocol[] = [
  // ---------------- PHYSICAL ----------------
  {
    id: "phys-posture-01",
    category: "physical",
    metric: "postureLoad",
    threshold: 60,
    condition: "above",
    title: "Spinal Alignment Reset",
    content:
      "Run a 3-minute posture reset: neutral spine, shoulders down/back, monitor at eye level, and seated hip-knee angle near 90 degrees.",
    source: "Occupational Ergonomics Practice Guide 2026",
  },
  {
    id: "phys-hydration-01",
    category: "physical",
    metric: "hydrationDeficit",
    threshold: 55,
    condition: "above",
    title: "Hydration Recovery Protocol",
    content:
      "Take 300–500ml water within 15 minutes. Add electrolytes if session exceeds 3 hours or if headache/fatigue is present.",
    source: "Sports Medicine Hydration Consensus",
  },
  {
    id: "phys-circulation-01",
    category: "physical",
    metric: "circulationRisk",
    threshold: 60,
    condition: "above",
    title: "Circulation Microbreak Routine",
    content:
      "Every 30-45 minutes stand, walk for 2 minutes, and perform calf/hip mobility to reduce static-load back pain risk.",
    source: "Sedentary Workload Injury Prevention Standard",
  },

  // ---------------- MENTAL ----------------
  {
    id: "mental-focus-01",
    category: "mental",
    metric: "focusCapacity",
    threshold: 45,
    condition: "below",
    title: "Cognitive Context Reset",
    content:
      "Step away from active coding for 5 minutes. Resume with one prioritized task and a clear stop condition.",
    source: "Cognitive Load Theory Field Notes 2026",
  },
  {
    id: "mental-load-01",
    category: "mental",
    metric: "cognitiveLoad",
    threshold: 65,
    condition: "above",
    title: "Complexity Decomposition Protocol",
    content:
      "Break current work into smaller executable units. Reduce branching decisions and checkpoint after each unit.",
    source: "Engineering Productivity Research Group",
  },
  {
    id: "mental-switch-01",
    category: "mental",
    metric: "contextSwitchRate",
    threshold: 60,
    condition: "above",
    title: "Task Switching Dampener",
    content:
      "Use 45-minute single-task blocks with notifications muted. Batch communication and code reviews into dedicated windows.",
    source: "Deep Work Execution Handbook",
  },

  // ---------------- EMOTIONAL ----------------
  {
    id: "emo-stress-01",
    category: "emotional",
    metric: "stressIndex",
    threshold: 60,
    condition: "above",
    title: "Stress Decompression Protocol",
    content:
      "Execute two cycles of 4-7-8 breathing, then switch to lower-pressure tasks for 10 minutes before re-entry.",
    source: "Behavioral Regulation in High-Load Teams",
  },
  {
    id: "emo-frustration-01",
    category: "emotional",
    metric: "frustrationLevel",
    threshold: 55,
    condition: "above",
    title: "Frustration Interrupt Script",
    content:
      "Pause and externalize the blocker: write the failure point, expected behavior, and one tiny next experiment.",
    source: "Applied Cognitive Behavioral Workflow Notes",
  },
  {
    id: "emo-recovery-01",
    category: "emotional",
    metric: "recoveryDebt",
    threshold: 60,
    condition: "above",
    title: "Recovery Debt Clearance",
    content:
      "Take a non-productive restorative break: short walk, hydration, and no screens for 8-12 minutes.",
    source: "Neuropsychological Recovery Systems Review",
  },

  // ---------------- ENVIRONMENTAL ----------------
  {
    id: "env-noise-01",
    category: "environmental",
    metric: "noiseDistractionIndex",
    threshold: 55,
    condition: "above",
    title: "Noise Isolation Protocol",
    content:
      "Reduce ambient interference with headphones, quieter location, or white noise to stabilize attention.",
    source: "Environmental Focus Stability Report",
  },
  {
    id: "env-light-01",
    category: "environmental",
    metric: "lightingStrain",
    threshold: 55,
    condition: "above",
    title: "Visual Lighting Correction",
    content:
      "Increase diffuse lighting, reduce screen glare, and match monitor brightness to room lighting to lower headache/eye strain risk.",
    source: "Visual Ergonomics Standards 2026",
  },
  {
    id: "env-ergo-01",
    category: "environmental",
    metric: "workspaceErgonomics",
    threshold: 45,
    condition: "below",
    title: "Workspace Ergonomic Optimization",
    content:
      "Improve chair/desk setup, monitor height, and keyboard/mouse position to reduce cumulative physical and mental friction.",
    source: "Workstation Ergonomics Consensus",
  },
];
