import { baseCampaign } from "./data";
import type { Campaign } from "./types";

/**
 * Deterministic brief -> campaign generator. A real provider can replace this
 * module wholesale; the contract (brief in, Campaign out) stays the same.
 */

type Profile = {
  id: string;
  match: RegExp;
  market: string;
  audience: Campaign["audience"];
  strategy: Campaign["strategy"];
  conceptSeeds: { name: string; premise: string; hero: string; tone: string[]; production: "Low" | "Medium" | "High"; boldness: number; premium: number }[];
  hooks: string[];
  ctas: string[];
  visual: Campaign["visual"];
  imagePrompts: string[];
  shots: Campaign["shots"];
  guardrails: string[];
};

const COFFEE: Profile = {
  id: "coffee",
  match: /coffee|cafe|café|tea|brew/i,
  market: "Urban India · heritage F&B",
  audience: {
    label: "Urban millennials rebuilding a daily ritual",
    ageRange: "27–38",
    mindset: "Nostalgic for craft, allergic to nostalgia marketing",
    channels: ["Instagram", "YouTube Shorts", "Cafés", "Newsletter"],
    tensions: [
      "They want provenance but won't read a heritage lecture",
      "Third-wave pricing has made a daily cup feel like a decision",
    ],
  },
  strategy: {
    positioning: "A heritage house that never stopped roasting — reintroduced at the speed of a weekday.",
    bigIdea: "The cup that was already yours.",
    proofPoints: ["Same roast profile since 1957", "Single-estate, traceable lots", "Brewed in under four minutes"],
    tone: "Warm, unhurried, quietly proud",
  },
  conceptSeeds: [
    { name: "First Light", premise: "The brand shows up in the ten minutes before the day starts.", hero: "Steam over a kitchen window at 6am.", tone: ["intimate", "warm", "slow"], production: "Low", boldness: 38, premium: 72 },
    { name: "The Ledger", premise: "Every lot traced back to the estate, printed like a receipt of trust.", hero: "Hand-stamped estate card beside the cup.", tone: ["documentary", "precise", "earned"], production: "Medium", boldness: 44, premium: 80 },
    { name: "Second Cup", premise: "Celebrating the unglamorous refill — loyalty, not discovery.", hero: "Two cups, one table, no faces.", tone: ["human", "dry", "familiar"], production: "Low", boldness: 55, premium: 62 },
  ],
  hooks: [
    "Older than your morning routine.",
    "We didn't reinvent it. We just kept roasting.",
    "Four minutes. Sixty-eight years.",
    "The refill is the loyalty programme.",
  ],
  ctas: ["Taste the 1957 roast", "Find your estate", "Start the ritual"],
  visual: {
    direction: "Kitchen-table realism. Daylight, worn surfaces, no styling props. The cup is always mid-use, never staged.",
    palette: [
      { name: "Roast", value: "#2A1C14" },
      { name: "Crema", value: "#C89A63" },
      { name: "Paper", value: "#EFE7DA" },
      { name: "Estate Green", value: "#3F5B45" },
    ],
    typography: "Editorial serif headlines, mono for lot numbers",
    lighting: "Soft window light, honest shadows",
    references: ["Kinfolk kitchen photography", "Letterpress packaging", "Estate archive scans"],
  },
  imagePrompts: [
    "Morning kitchen still life, ceramic cup of black coffee on a worn wooden table, soft window light, steam catching the light, 50mm, natural grain",
    "Macro of a hand-stamped estate card and coffee beans on kraft paper, daylight, shallow depth of field",
    "Wide shot of an old Indian coffee house interior, mid-morning, patrons out of focus, single cup sharp in foreground",
  ],
  shots: [
    { id: "s1", time: "0:00–0:02", shot: "Kettle, no music, only sound", note: "Audio-first open" },
    { id: "s2", time: "0:02–0:06", shot: "Pour in real time", note: "Type overlay: est. 1957" },
    { id: "s3", time: "0:06–0:10", shot: "First sip, no face above the nose", note: "Warmth cue" },
    { id: "s4", time: "0:10–0:13", shot: "Pack shot on kitchen table", note: "CTA: Taste the 1957 roast" },
  ],
  guardrails: [
    "Never use the words 'artisanal' or 'journey'",
    "No latte art hero shots",
    "Heritage claims must cite a verifiable year",
    "Product always shown in a domestic or café context, never a studio",
    "Price is never the lead message",
  ],
};

const SKINCARE: Profile = {
  id: "skincare",
  match: /skincare|skin|beauty|cosmetic|sunscreen/i,
  market: "India · mass-premium personal care",
  audience: {
    label: "Heat-exposed commuters who gave up on routines",
    ageRange: "22–34",
    mindset: "Wants relief, not a regimen",
    channels: ["Instagram", "Reels", "Quick-commerce", "Pharmacy"],
    tensions: [
      "Every product is written for a climate they don't live in",
      "Ten-step routines collapse by the second week of April",
    ],
  },
  strategy: {
    positioning: "Formulated for 41°C and a two-hour commute, not for a Seoul winter.",
    bigIdea: "Made for the weather you actually have.",
    proofPoints: ["Sweat-tested at 40°C / 70% humidity", "Non-comedogenic, no white cast", "Three steps, under 90 seconds"],
    tone: "Plain-spoken, clinical, unbothered",
  },
  conceptSeeds: [
    { name: "41 Degrees", premise: "The campaign is a weather report the category keeps ignoring.", hero: "Thermometer against a bus window.", tone: ["clinical", "dry", "local"], production: "Low", boldness: 52, premium: 66 },
    { name: "Three Steps", premise: "Radical reduction — the routine you can finish.", hero: "Three products, one shelf, nothing else.", tone: ["minimal", "confident", "useful"], production: "Low", boldness: 40, premium: 74 },
    { name: "Sweat Test", premise: "Show the proof: real people, real heat, real hours.", hero: "Timestamped split-screen across one afternoon.", tone: ["documentary", "credible", "raw"], production: "Medium", boldness: 64, premium: 58 },
  ],
  hooks: [
    "Built for 41°C, not for a Seoul winter.",
    "Three steps. Ninety seconds. Done.",
    "No white cast. No lecture.",
    "Your routine failed because it wasn't written for here.",
  ],
  ctas: ["Start the 3-step", "See the sweat test", "Find your formula"],
  visual: {
    direction: "Daylight clinical. Hard Indian sun, honest skin texture, no retouching of pores. Product photographed like equipment.",
    palette: [
      { name: "Shade", value: "#14181A" },
      { name: "Noon", value: "#F2C14E" },
      { name: "Salt", value: "#F1EFEA" },
      { name: "Aloe", value: "#4E8672" },
    ],
    typography: "Neutral grotesque, mono for claims and temperatures",
    lighting: "Direct overhead sun, deliberate specular highlights on skin",
    references: ["Clinical product catalogues", "Street documentary portraiture", "Instrument packaging"],
  },
  imagePrompts: [
    "Close-up portrait of a young Indian woman in direct midday sun, visible skin texture and sweat, no retouching, sharp catchlights, 85mm",
    "Product bottle standing on hot concrete, hard shadow, heat shimmer in background, clinical daylight",
    "Overhead flat lay of three skincare products on a bathroom shelf, natural light, no props",
  ],
  shots: [
    { id: "s1", time: "0:00–0:02", shot: "Thermometer hits 41", note: "Sound: traffic" },
    { id: "s2", time: "0:02–0:05", shot: "Commute montage, timestamped", note: "Overlay: 2h 14m" },
    { id: "s3", time: "0:05–0:09", shot: "Skin close-up, still matte", note: "Claim: no white cast" },
    { id: "s4", time: "0:09–0:12", shot: "Three products, one line of type", note: "CTA: Start the 3-step" },
  ],
  guardrails: [
    "Never retouch pores or texture out of skin",
    "No 'fairness', 'brightening' or tone-shift language",
    "Every performance claim cites its test condition",
    "Models reflect a range of Indian skin tones",
    "No before/after imagery",
  ],
};

const FINTECH: Profile = {
  id: "fintech",
  match: /fintech|invest|bank|finance|payment|money|app/i,
  market: "India · first-time retail investors",
  audience: {
    label: "First-time investors who feel talked down to",
    ageRange: "24–35",
    mindset: "Curious, cautious, quietly embarrassed about not knowing",
    channels: ["YouTube", "Instagram", "App store", "WhatsApp forwards"],
    tensions: [
      "Every finance brand sounds like an exam they already failed",
      "Fear of losing money outweighs the promise of returns",
    ],
  },
  strategy: {
    positioning: "The first money app that explains itself in the language people actually ask questions in.",
    bigIdea: "No stupid questions about money.",
    proofPoints: ["Every screen has a plain-language 'why'", "Start with ₹100", "No jargon without a one-line translation"],
    tone: "Calm, human, never condescending",
  },
  conceptSeeds: [
    { name: "Ask Anything", premise: "The campaign is made entirely of real beginner questions.", hero: "A search bar filling with honest questions.", tone: ["human", "direct", "kind"], production: "Low", boldness: 48, premium: 60 },
    { name: "₹100", premise: "Shrink the stakes until starting stops being scary.", hero: "A single hundred-rupee note becoming a chart.", tone: ["simple", "tangible", "warm"], production: "Medium", boldness: 42, premium: 68 },
    { name: "Translate", premise: "Side-by-side: what finance says vs what it means.", hero: "Split-screen jargon and plain speech.", tone: ["witty", "clear", "confident"], production: "Low", boldness: 66, premium: 55 },
  ],
  hooks: [
    "No stupid questions about money.",
    "Start with ₹100. Ask the rest later.",
    "We translate finance into sentences.",
    "You're not bad at money. It was badly explained.",
  ],
  ctas: ["Ask your first question", "Start with ₹100", "See it in plain words"],
  visual: {
    direction: "Quiet interface realism. Real devices in real hands, generous whitespace, type does the heavy lifting. No abstract 3D coins.",
    palette: [
      { name: "Ink", value: "#101317" },
      { name: "Signal", value: "#E0A33E" },
      { name: "Paper", value: "#F4F1EB" },
      { name: "Trust Blue", value: "#3A5A8C" },
    ],
    typography: "Humanist sans headlines, mono for numbers and rupee values",
    lighting: "Soft indoor daylight, screen glow as a second source",
    references: ["Editorial explainer layouts", "Product-first tech advertising", "Handwritten annotation"],
  },
  imagePrompts: [
    "Hands holding a phone at a kitchen table, soft daylight, screen glow on face out of frame, shallow depth of field, 35mm",
    "Macro of a hundred-rupee note on a plain surface, single hard light, editorial product framing",
    "Overhead of a notebook with a handwritten money question beside a phone, natural light",
  ],
  shots: [
    { id: "s1", time: "0:00–0:02", shot: "Cursor typing a beginner question", note: "Type on screen only" },
    { id: "s2", time: "0:02–0:06", shot: "App answers in plain language", note: "UI capture, real product" },
    { id: "s3", time: "0:06–0:09", shot: "₹100 invested, tiny chart moves", note: "Restraint: no hype numbers" },
    { id: "s4", time: "0:09–0:12", shot: "Logo with the line", note: "CTA: Start with ₹100" },
  ],
  guardrails: [
    "Never imply guaranteed or projected returns",
    "Risk disclosure is present in every performance frame",
    "No jargon without an inline translation",
    "No aspirational wealth imagery — cars, villas, yachts",
    "Never mock the viewer's lack of knowledge",
  ],
};

const PROFILES = [COFFEE, SKINCARE, FINTECH];

function titleWords(brief: string) {
  return brief
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 6);
}

function genericProfile(brief: string): Profile {
  const words = titleWords(brief);
  const subject = words.slice(0, 3).join(" ") || "the brand";
  return {
    id: "generic",
    match: /.*/,
    market: "Brief-defined market",
    audience: {
      label: `People the brief calls on: ${subject}`,
      ageRange: "22–40",
      mindset: "Sceptical of category advertising, responsive to specifics",
      channels: ["Instagram", "YouTube", "Owned site", "Email"],
      tensions: [
        "The category sounds identical to everyone inside it",
        "Proof travels further than promise",
      ],
    },
    strategy: {
      positioning: `A sharper, more specific reading of: ${brief}`,
      bigIdea: "Say the true thing first.",
      proofPoints: ["One demonstrable product truth", "One credible third-party signal", "One thing competitors can't claim"],
      tone: "Direct, specific, unhurried",
    },
    conceptSeeds: [
      { name: "The Specific", premise: "Lead with the one detail only this brief can own.", hero: "A single unglamorous proof point, shot beautifully.", tone: ["precise", "credible"], production: "Low", boldness: 45, premium: 70 },
      { name: "Counterpoint", premise: "Name the category cliché, then refuse it on camera.", hero: "The expected shot, interrupted.", tone: ["witty", "confident"], production: "Medium", boldness: 68, premium: 62 },
      { name: "In Use", premise: "No campaign world — only the real context of use.", hero: "Documentary frame, no styling.", tone: ["documentary", "warm"], production: "Low", boldness: 40, premium: 66 },
    ],
    hooks: [
      "Say the true thing first.",
      "Proof beats promise.",
      "Everything else in this category sounds the same.",
      "Built for the actual use, not the ad.",
    ],
    ctas: ["See the proof", "Start here", "Take a closer look"],
    visual: {
      direction: "Documentary realism with editorial restraint. Real contexts, generous negative space, no studio sweeps.",
      palette: [
        { name: "Graphite", value: "#131518" },
        { name: "Ember", value: "#DD8A3F" },
        { name: "Bone", value: "#EDE8DE" },
        { name: "Slate", value: "#48555E" },
      ],
      typography: "Tight grotesque headlines, wide-tracked mono for labels",
      lighting: "Single dominant source, honest falloff",
      references: ["Editorial documentary photography", "Analogue grain", "Swiss type layouts"],
    },
    imagePrompts: [
      `Editorial photograph illustrating: ${brief}. Single practical light source, real context, 50mm, subtle film grain, no text`,
      `Macro detail shot of the key product truth described in: ${brief}. Shallow depth of field, cold key light`,
      `Wide environmental frame of the audience described in: ${brief}. Documentary framing, natural light`,
    ],
    shots: [
      { id: "s1", time: "0:00–0:02", shot: "Cold open on the tension", note: "Ambient audio only" },
      { id: "s2", time: "0:02–0:05", shot: "The specific proof, in close", note: "Overlay: the claim" },
      { id: "s3", time: "0:05–0:09", shot: "Product in real use", note: "No voiceover" },
      { id: "s4", time: "0:09–0:12", shot: "Lockup and line", note: "CTA" },
    ],
    guardrails: [
      "No studio sweep product shots",
      "No hype adjectives without evidence",
      "Every claim traceable to the brief",
      "Casting reflects the stated audience",
      "Price is never the lead message",
    ],
  };
}

export function generateCampaign(brief: string): Campaign {
  const b = brief.trim();
  const sneaker = /sneaker|shoe|footwear|drop|streetwear/i.test(b);
  if (sneaker || !b) return baseCampaign(b);

  const profile = PROFILES.find((p) => p.match.test(b)) ?? genericProfile(b);
  const base = baseCampaign(b);

  return {
    ...base,
    brief: b,
    market: profile.market,
    audience: profile.audience,
    strategy: profile.strategy,
    concepts: profile.conceptSeeds.map((c, i) => ({ id: `c${i + 1}`, ...c })),
    hooks: profile.hooks,
    ctas: profile.ctas,
    visual: profile.visual,
    imagePrompts: profile.imagePrompts,
    shots: profile.shots,
    guardrails: profile.guardrails,
    qa: base.qa,
  };
}
