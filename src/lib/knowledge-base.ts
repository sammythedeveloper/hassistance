// src/lib/knowledge-base.ts

export interface Protocol {
  id: string;
  metric:
    | "ocularStrain"
    | "hoursCoded"
    | "focusCapacity"
    | "imposterScore"
    | "contextSwitches";
  threshold: number;
  condition: "above" | "below";
  title: string;
  content: string;
  source: string;
}

export const KNOWLEDGE_BASE: Protocol[] = [
  {
    id: "eye-v2026",
    metric: "ocularStrain",
    threshold: 40,
    condition: "above",
    title: "The 20-20-20 Ocular Reset",
    content:
      "Standard: Look at an object 20+ feet away for 20 seconds. 2026 Update: Perform 10-15 'Conscious Blinks' during the break to restore the lipid layer of the tear film, which degrades by 50% during deep-focus coding.",
    source: "Digital Eye Strain Guide 2026",
  },
  {
    id: "posture-90",
    metric: "hoursCoded",
    threshold: 3,
    condition: "above",
    title: "90-90-90 Alignment Protocol",
    content:
      "Static load exceeds 180 mins. Verify 'Neutral Working Posture': Elbows at 90-120°, Hips at 90°, and Knees at 90°. Perform 3 'Scapular Squeezes' to counteract 'Developer Slump' (Thoracic Kyphosis).",
    source: "OSHA Ergonomic Standards 2026",
  },
  {
    id: "cog-entropy",
    metric: "focusCapacity",
    threshold: 40,
    condition: "below",
    title: "Cognitive Context Reset",
    content:
      "High mental entropy detected. Switch to a 'Non-Visual' task for 5 minutes (e.g., hydration or standing stretch). This allows the Default Mode Network to re-initialize and lowers cortisol spikes.",
    source: "Behavioral Ergonomics Whitepaper 2026",
  },
  {
    id: "imposter-syndrome-hunt",
    metric: "imposterScore",
    threshold: 8,
    condition: "above",
    title: "Job Hunt Resilience Protocol",
    content:
      "High imposter signals during job hunting. Pivot from 'Outcome Focus' (getting hired) to 'Process Focus' (improving the build).",
    source: "Mental Health Engineering 2026",
  },
  {
    id: "devops-context-limit",
    metric: "contextSwitches",
    threshold: 10,
    condition: "above",
    title: "DevOps Context Collapse",
    content:
      "High context switching detected. Implement a 'No-Meeting' 4-hour block to consolidate operational tasks.",
    source: "Platform Engineering Best Practices",
  },
];
