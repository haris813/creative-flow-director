import type { Campaign } from "./types";

export interface DirectorResult {
  reply: string;
  changes: string[];
  touched: string[];
  campaign: Campaign;
}

export const QUICK_PROMPTS = [
  "Make it more premium",
  "Give me 3 bolder concepts",
  "Change the audience to college students",
  "Reduce production complexity",
  "Make the hooks more provocative",
];

const clamp = (n: number) => Math.max(0, Math.min(100, n));

function clone(c: Campaign): Campaign {
  return JSON.parse(JSON.stringify(c)) as Campaign;
}

/**
 * Deterministic local "creative director". Swap this module for a real
 * provider call later — the contract (Campaign in, DirectorResult out)
 * is all the UI depends on.
 */
export function runDirector(input: string, current: Campaign): DirectorResult {
  const q = input.toLowerCase();
  const c = clone(current);
  const changes: string[] = [];
  const touched: string[] = [];

  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (has("premium", "luxur", "elevated", "expensive")) {
    c.strategy.positioning =
      "A quiet-luxury sneaker for people who read craft before logos — restraint as the flex.";
    c.strategy.tone = "Restrained, exacting, unhurried";
    c.visual.direction =
      "Gallery-grade stillness. Fewer frames, longer holds, material-first macro. Every surface reads as hand-finished.";
    c.visual.lighting = "Soft directional key, controlled specular roll-off, matte blacks";
    c.concepts = c.concepts.map((x) => ({
      ...x,
      premium: clamp(x.premium + 14),
      tone: Array.from(new Set([...x.tone, "restrained"])),
    }));
    c.hooks = [
      "Craft, not caption.",
      "500 pairs. Each one finished by hand.",
      "Loud shoes are easy. This isn't.",
      "The quietest thing in the room.",
    ];
    c.imagePrompts[0] =
      "Museum-lit macro of hand-finished leather sneaker on brushed stone plinth, soft directional key light, matte black background, medium format detail, no logos visible";
    changes.push("Repositioned strategy toward quiet luxury");
    changes.push("Raised premium score on all 3 concepts");
    changes.push("Rewrote hooks with restrained language");
    touched.push("strategy", "concepts", "copy", "visual", "prompts");
    return {
      reply:
        "Pulled the whole workflow up-market. The bet moves from street-credibility to craft-credibility: restraint becomes the flex. I rewrote positioning, lifted every concept's premium score, replaced the hooks with lower-volume lines, and re-lit the art direction — soft key, matte blacks, material-first macro. Guardrails still hold: no white sweep, no hype language.",
      changes,
      touched,
      campaign: c,
    };
  }

  if (has("bolder", "braver", "riskier", "3 concepts", "new concepts", "different concepts")) {
    c.concepts = [
      {
        id: "c1",
        name: "Counterfeit Culture",
        premise:
          "We advertise the fakes before the real thing exists — the copy is the proof of desire.",
        hero: "A wall of bootleg posters, one of them real.",
        tone: ["provocative", "meta", "street"],
        production: "Medium",
        boldness: 92,
        premium: 66,
      },
      {
        id: "c2",
        name: "Curfew",
        premise: "The shoe only appears between midnight and 4am. So does the campaign.",
        hero: "Countdown billboards that only light up after dark.",
        tone: ["nocturnal", "restrictive", "cult"],
        production: "Low",
        boldness: 88,
        premium: 79,
      },
      {
        id: "c3",
        name: "Numbered Enemies",
        premise:
          "Each of the 500 pairs is assigned a rival pair. Owners find each other. The city becomes the campaign.",
        hero: "Two strangers, matching numbers, opposite platforms.",
        tone: ["competitive", "social", "kinetic"],
        production: "High",
        boldness: 95,
        premium: 72,
      },
    ];
    c.strategy.bigIdea = "Make the drop feel like a rumour you weren't supposed to hear.";
    changes.push("Replaced all three concepts with high-boldness territories");
    changes.push("Sharpened the big idea to a rumour mechanic");
    touched.push("concepts", "strategy", "copy");
    return {
      reply:
        "Three new territories, all pushed hard. Counterfeit Culture is the riskiest — it needs legal sign-off. Curfew is the cheapest to run and the most ownable. Numbered Enemies has the strongest social loop but the highest production load. My pick: Curfew as the lead, Numbered Enemies as the always-on layer.",
      changes,
      touched,
      campaign: c,
    };
  }

  if (has("college", "student", "campus", "younger audience")) {
    c.audience = {
      label: "College students, 18–22",
      ageRange: "18–22",
      mindset:
        "Budget-constrained but taste-rich. Status comes from being early, not from spending most. Group decisions beat solo ones.",
      channels: ["Campus WhatsApp groups", "Instagram Reels", "College fest activations", "Snapchat"],
      tensions: [
        "Wants premium, funds it in instalments or shares with friends",
        "Fear of buying the thing everyone already has",
        "Campus visibility matters more than city-wide reach",
      ],
    };
    c.strategy.positioning =
      "The premium pair a student can actually earn — access designed around campus timelines, not payday.";
    c.ctas = ["Get campus access", "Split the drop with a friend", "Join your college list"];
    c.hooks = [
      "Premium doesn't wait for your first salary.",
      "500 pairs. 40 campuses. Do the math.",
      "Be early, not expensive.",
      "Your campus gets 12 pairs. That's it.",
    ];
    c.shots[1] = { id: "s2", time: "0:02–0:05", shot: "Campus corridor, pair passed hand to hand", note: "Type: 12 pairs per campus" };
    changes.push("Rebuilt audience profile around campus behaviour");
    changes.push("Reframed access as the strategic wedge");
    changes.push("New hooks + CTAs and one revised shot");
    touched.push("audience", "strategy", "copy", "shots");
    return {
      reply:
        "Audience swapped to college students, and that changes the strategy more than the visuals. Access replaces exclusivity as the wedge — scarcity is now per-campus, which makes the drop socially visible where it actually matters. Hooks and CTAs rewritten around that, plus a shot change so the film shows the pair moving through a corridor instead of an empty flyover.",
      changes,
      touched,
      campaign: c,
    };
  }

  if (has("production", "cheaper", "simpler", "budget", "complexity", "faster")) {
    c.concepts = c.concepts.map((x) => ({ ...x, production: "Low" as const }));
    c.shots = [
      { id: "s1", time: "0:00–0:03", shot: "Static macro, product rotating on turntable", note: "Single location, one light" },
      { id: "s2", time: "0:03–0:07", shot: "Handheld phone shot, real street, no crew", note: "Shot by talent, no permits" },
      { id: "s3", time: "0:07–0:10", shot: "Type card over black + CTA", note: "Motion graphics only" },
    ];
    c.visual.direction =
      "One location, one light, one lens. Everything else is type and edit. Built to be reshot in a day.";
    c.imagePrompts = c.imagePrompts.slice(0, 2);
    changes.push("All concepts re-scoped to low production");
    changes.push("Shot list cut from 4 to 3, crewless setup");
    changes.push("Image prompts trimmed to the two essentials");
    touched.push("concepts", "visual", "shots", "prompts");
    return {
      reply:
        "Stripped the production load. Every concept now runs on one location, one light, one lens — the shot list drops to three setups and two of them need no crew or permits. You lose the flyover scale, you gain the ability to reshoot weekly. For a 500-pair drop that trade is correct.",
      changes,
      touched,
      campaign: c,
    };
  }

  if (has("hook", "provocative", "copy", "headline", "punch", "edgier")) {
    c.hooks = [
      "You can't afford to look this unbothered.",
      "500 pairs. 1.4 billion people. Good luck.",
      "If you have to ask the price, you're already too late.",
      "We made 500. We're not making more. That's the whole ad.",
      "Wear it home at 2am or don't wear it at all.",
    ];
    c.ctas = ["Take a number", "Prove you were early", "See who got one"];
    changes.push("Rewrote all hooks with confrontational framing");
    changes.push("Sharpened CTAs to status-verbs");
    touched.push("copy");
    return {
      reply:
        "Hooks are meaner now. They lead with refusal rather than invitation — scarcity stated as fact, no persuasion. Watch the guardrail on hype language: these stay clean of it, but line 2 needs a legal read on the population claim before it ships.",
      changes,
      touched,
      campaign: c,
    };
  }

  if (has("guardrail", "brand safe", "compliance", "legal")) {
    c.guardrails = [
      ...c.guardrails,
      "Any scarcity claim must be numerically verifiable at time of publish",
      "No comparative claims against named competitors",
    ];
    changes.push("Added two compliance guardrails");
    touched.push("guardrails", "qa");
    return {
      reply:
        "Tightened the guardrails. Scarcity claims now need to be verifiable at publish time, and comparative claims are out entirely. I flagged the QA node so the copy pass picks these up.",
      changes,
      touched,
      campaign: c,
    };
  }

  return {
    reply:
      `I can act on that, but let me be precise about where it lands. Right now the workflow is anchored on "${c.strategy.bigIdea}" for ${c.audience.label}. Tell me which layer to move — the audience, the strategic bet, the concepts, the copy, or the production load — and I'll rewrite the connected nodes and show you exactly what changed.`,
    changes: [],
    touched: [],
    campaign: c,
  };
}
