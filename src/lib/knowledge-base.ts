// src/lib/knowledge-base.ts

export type Category = "physical" | "mental" | "emotional" | "environmental";

export interface Protocol {
  id: string;
  category: Category;
  signal: string;
  threshold: number;
  condition: "above" | "below";
  title: string;
  content: string;
  source: string;
}

export const KNOWLEDGE_BASE: Protocol[] = [
  {
    id: "eye-v2026",
    category: "physical",
    signal: "ocularStrain",
    threshold: 40,
    condition: "above",
    title: "The 20-20-20 Ocular Reset",
    content:
      "Look at an object 20+ feet away for 20 seconds. Add conscious blinking to restore tear film stability.",
    source: "Digital Eye Strain Guide 2026",
  },

  {
    id: "posture-90",
    category: "physical",
    signal: "postureLoad",
    threshold: 60,
    condition: "above",
    title: "90-90-90 Alignment Protocol",
    content:
      "Reset spinal alignment. Elbows, hips, knees at 90 degrees. Perform scapular activation.",
    source: "OSHA Ergonomic Standards 2026",
  },

  {
    id: "cog-entropy",
    category: "mental",
    signal: "focusCapacity",
    threshold: 40,
    condition: "below",
    title: "Cognitive Context Reset",
    content:
      "Step away from visual input for 5 minutes to reset cognitive load.",
    source: "Behavioral Ergonomics Whitepaper 2026",
  },

  {
    id: "stress-overload",
    category: "emotional",
    signal: "stressIndex",
    threshold: 70,
    condition: "above",
    title: "Emotional Load Stabilization",
    content:
      "High stress detected. Pause output tasks and perform grounding reset.",
    source: "Mental Health Engineering 2026",
  },

  {
    id: "environment-collapse",
    category: "environmental",
    signal: "noiseDistractionIndex",
    threshold: 65,
    condition: "above",
    title: "Environmental Focus Recovery",
    content:
      "Reduce sensory overload. Switch to controlled workspace or silence inputs.",
    source: "Workspace Optimization Study",
  },
];
