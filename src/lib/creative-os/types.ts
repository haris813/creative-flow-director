export type NodeKind =
  | "input"
  | "insight"
  | "strategy"
  | "creative"
  | "copy"
  | "visual"
  | "prompt"
  | "motion"
  | "guardrail"
  | "qa"
  | "export";

export type NodeStatus = "idle" | "queued" | "running" | "done" | "error";

export interface WorkflowNode {
  id: string;
  kind: NodeKind;
  title: string;
  kicker: string;
  x: number;
  y: number;
  status: NodeStatus;
  updatedAt?: number;
}

export interface Edge {
  from: string;
  to: string;
}

export interface Concept {
  id: string;
  name: string;
  premise: string;
  hero: string;
  tone: string[];
  production: "Low" | "Medium" | "High";
  boldness: number; // 0-100
  premium: number; // 0-100
}

export interface Campaign {
  brief: string;
  market: string;
  audience: {
    label: string;
    ageRange: string;
    mindset: string;
    channels: string[];
    tensions: string[];
  };
  strategy: {
    positioning: string;
    bigIdea: string;
    proofPoints: string[];
    tone: string;
  };
  concepts: Concept[];
  hooks: string[];
  ctas: string[];
  visual: {
    direction: string;
    palette: { name: string; value: string }[];
    typography: string;
    lighting: string;
    references: string[];
  };
  imagePrompts: string[];
  shots: { id: string; time: string; shot: string; note: string }[];
  guardrails: string[];
  qa: { id: string; label: string; done: boolean }[];
}

export interface DirectorMessage {
  id: string;
  role: "user" | "director";
  text: string;
  changes?: string[];
  touched?: string[];
  at: number;
}
