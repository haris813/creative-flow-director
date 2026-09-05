import type { Campaign, Edge, WorkflowNode } from "./types";

export const DEMO_BRIEF = "Launch a premium sneaker collection for Gen Z in India.";

export const EXAMPLE_BRIEFS = [
  DEMO_BRIEF,
  "Relaunch a heritage coffee brand for urban millennials.",
  "Introduce a skincare line built around Indian summer heat.",
  "Make a fintech app feel human for first-time investors.",
];

export const NODES: WorkflowNode[] = [
  { id: "brief", kind: "input", title: "Brief", kicker: "Source of truth", x: 40, y: 260, status: "idle" },
  { id: "audience", kind: "insight", title: "Audience", kicker: "Who we move", x: 300, y: 90, status: "idle" },
  { id: "strategy", kind: "strategy", title: "Creative Strategy", kicker: "The bet", x: 300, y: 430, status: "idle" },
  { id: "concepts", kind: "creative", title: "Concepts", kicker: "3 territories", x: 590, y: 250, status: "idle" },
  { id: "copy", kind: "copy", title: "Copy & Hooks", kicker: "Scroll-stoppers", x: 880, y: 60, status: "idle" },
  { id: "visual", kind: "visual", title: "Visual Direction", kicker: "Art direction", x: 880, y: 300, status: "idle" },
  { id: "prompts", kind: "prompt", title: "Image Prompts", kicker: "Generation-ready", x: 1170, y: 190, status: "idle" },
  { id: "shots", kind: "motion", title: "Video Shots", kicker: "Short-form cutdown", x: 1170, y: 430, status: "idle" },
  { id: "guardrails", kind: "guardrail", title: "Brand Guardrails", kicker: "Non-negotiables", x: 880, y: 560, status: "idle" },
  { id: "qa", kind: "qa", title: "QA", kicker: "Ship checks", x: 1460, y: 310, status: "idle" },
  { id: "export", kind: "export", title: "Export", kicker: "Campaign workspace", x: 1740, y: 310, status: "idle" },
];

export const EDGES: Edge[] = [
  { from: "brief", to: "audience" },
  { from: "brief", to: "strategy" },
  { from: "audience", to: "concepts" },
  { from: "strategy", to: "concepts" },
  { from: "concepts", to: "copy" },
  { from: "concepts", to: "visual" },
  { from: "visual", to: "prompts" },
  { from: "visual", to: "shots" },
  { from: "strategy", to: "guardrails" },
  { from: "copy", to: "qa" },
  { from: "prompts", to: "qa" },
  { from: "shots", to: "qa" },
  { from: "guardrails", to: "qa" },
  { from: "qa", to: "export" },
];

export const NODE_ORDER = NODES.map((n) => n.id);

export function baseCampaign(brief: string): Campaign {
  return {
    brief,
    market: "India · Metro + Tier 1",
    audience: {
      label: "Gen Z sneaker culture, 18–24",
      ageRange: "18–24",
      mindset:
        "Style is identity currency. They buy fewer, louder pieces and expect the brand to know the culture better than they do.",
      channels: ["Instagram Reels", "YouTube Shorts", "Sneaker Discords", "Campus drops"],
      tensions: [
        "Premium is aspirational, but they refuse to look like they tried too hard",
        "Global hype vs. wanting something that feels local to them",
        "Resale literacy — they can smell a manufactured drop",
      ],
    },
    strategy: {
      positioning: "The first premium sneaker that behaves like street culture, not like luxury retail.",
      bigIdea: "Built for the walk home at 2am.",
      proofPoints: [
        "Hand-finished uppers, 48-hour cure",
        "Numbered pairs, no restock",
        "Designed with three Indian street artists",
      ],
      tone: "Confident, low-volume, culturally fluent",
    },
    concepts: [
      {
        id: "c1",
        name: "Night Shift",
        premise: "The city after the city closes — the hours when style stops performing for anyone.",
        hero: "A single pair crossing an empty flyover under sodium light.",
        tone: ["cinematic", "quiet", "nocturnal"],
        production: "Medium",
        boldness: 58,
        premium: 78,
      },
      {
        id: "c2",
        name: "Numbered",
        premise: "Every pair carries a number. The campaign is a countdown, not an ad.",
        hero: "Macro of the stamped number, then the wearer refusing to show their face.",
        tone: ["scarce", "collectible", "precise"],
        production: "Low",
        boldness: 46,
        premium: 84,
      },
      {
        id: "c3",
        name: "Street Council",
        premise: "Three artists, three cities, one silhouette interpreted their way.",
        hero: "Split-frame triptych of Delhi, Mumbai, Bengaluru.",
        tone: ["collaborative", "textured", "local"],
        production: "High",
        boldness: 62,
        premium: 70,
      },
    ],
    hooks: [
      "You don't need permission to look expensive.",
      "500 pairs. No restock. No apology.",
      "Made for the walk home, not the front row.",
      "Premium, minus the price of pretending.",
    ],
    ctas: ["Claim your number", "Join the drop list", "See the 500"],
    visual: {
      direction:
        "Nocturnal realism. Wide, patient frames with heavy negative space. Product is never floating — always in a real Indian street context.",
      palette: [
        { name: "Asphalt", value: "#111214" },
        { name: "Sodium", value: "#E8A24A" },
        { name: "Bone", value: "#EDE7DC" },
        { name: "Signal Red", value: "#C6402F" },
      ],
      typography: "Tight grotesque headlines, wide-tracked mono for numbers",
      lighting: "Single practical source, deep falloff, no fill",
      references: ["Sodium-lit street photography", "Analogue grain", "Brutalist type layouts"],
    },
    imagePrompts: [
      "Editorial product photograph of a premium leather sneaker on wet Delhi asphalt at night, single sodium streetlight, deep shadow falloff, 50mm, subtle film grain, no people",
      "Macro detail of a stamped serial number on a sneaker heel counter, bone-white leather, cold key light, shallow depth of field",
      "Wide environmental shot of a young Indian skater walking away under a flyover, motion blur in background, sneakers in sharp focus, cinematic teal-amber contrast",
    ],
    shots: [
      { id: "s1", time: "0:00–0:02", shot: "Black frame, single foot enters sodium light", note: "Audio: street ambience only" },
      { id: "s2", time: "0:02–0:05", shot: "Macro pan across stamped number", note: "Type overlay: 001 / 500" },
      { id: "s3", time: "0:05–0:09", shot: "Walking tracking shot, flyover", note: "Beat drops on step 3" },
      { id: "s4", time: "0:09–0:12", shot: "Hero pack shot, logo lockup", note: "CTA: Claim your number" },
    ],
    guardrails: [
      "Never show the product on a white studio sweep",
      "No hype language: 'insane', 'fire', 'must-cop' are banned",
      "Faces are optional; the shoe carries the frame",
      "Price is never the lead message",
      "All talent is India-based and credited on screen",
    ],
    qa: [
      { id: "q1", label: "Claims verified against product spec", done: true },
      { id: "q2", label: "Cultural review by India-based reviewer", done: true },
      { id: "q3", label: "Aspect ratios exported 9:16, 4:5, 1:1", done: true },
      { id: "q4", label: "Captions and alt text written", done: false },
      { id: "q5", label: "Talent usage rights cleared 12 months", done: false },
    ],
  };
}
