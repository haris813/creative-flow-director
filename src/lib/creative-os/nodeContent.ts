import type { Campaign } from "./types";

export interface NodeLine {
  label?: string;
  value: string;
}

export interface NodePayload {
  summary: string;
  lines: NodeLine[];
  metric: string;
}

export function nodePayload(id: string, c: Campaign): NodePayload {
  switch (id) {
    case "brief":
      return {
        summary: c.brief,
        lines: [
          { label: "Market", value: c.market },
          { label: "Deliverables", value: "3 concepts · 5 hooks · 3 stills · 1 cutdown" },
          { label: "Constraint", value: "500 numbered pairs, no restock" },
        ],
        metric: "1 input",
      };
    case "audience":
      return {
        summary: c.audience.label,
        lines: [
          { label: "Mindset", value: c.audience.mindset },
          { label: "Channels", value: c.audience.channels.join(" · ") },
          ...c.audience.tensions.map((t) => ({ label: "Tension", value: t })),
        ],
        metric: `${c.audience.channels.length} channels`,
      };
    case "strategy":
      return {
        summary: c.strategy.bigIdea,
        lines: [
          { label: "Positioning", value: c.strategy.positioning },
          { label: "Tone", value: c.strategy.tone },
          ...c.strategy.proofPoints.map((p) => ({ label: "Proof", value: p })),
        ],
        metric: `${c.strategy.proofPoints.length} proof points`,
      };
    case "concepts":
      return {
        summary: c.concepts.map((x) => x.name).join(" · "),
        lines: c.concepts.map((x) => ({ label: x.name, value: x.premise })),
        metric: `${c.concepts.length} territories`,
      };
    case "copy":
      return {
        summary: c.hooks[0] ?? "",
        lines: [
          ...c.hooks.map((h) => ({ label: "Hook", value: h })),
          { label: "CTAs", value: c.ctas.join(" · ") },
        ],
        metric: `${c.hooks.length} hooks · ${c.ctas.length} CTAs`,
      };
    case "visual":
      return {
        summary: c.visual.direction,
        lines: [
          { label: "Typography", value: c.visual.typography },
          { label: "Lighting", value: c.visual.lighting },
          { label: "References", value: c.visual.references.join(" · ") },
        ],
        metric: `${c.visual.palette.length} colours`,
      };
    case "prompts":
      return {
        summary: `${c.imagePrompts.length} generation-ready prompts`,
        lines: c.imagePrompts.map((p, i) => ({ label: `Still ${i + 1}`, value: p })),
        metric: `${c.imagePrompts.length} stills`,
      };
    case "shots":
      return {
        summary: `${c.shots.length}-shot vertical cutdown`,
        lines: c.shots.map((s) => ({ label: s.time, value: `${s.shot} — ${s.note}` })),
        metric: `${c.shots.length} shots`,
      };
    case "guardrails":
      return {
        summary: `${c.guardrails.length} non-negotiables enforced downstream`,
        lines: c.guardrails.map((g) => ({ value: g })),
        metric: `${c.guardrails.length} rules`,
      };
    case "qa": {
      const done = c.qa.filter((q) => q.done).length;
      return {
        summary: `${done} of ${c.qa.length} ship checks passing`,
        lines: c.qa.map((q) => ({ label: q.done ? "Pass" : "Open", value: q.label })),
        metric: `${done}/${c.qa.length}`,
      };
    }
    case "export":
    default:
      return {
        summary: "Campaign workspace, packaged for handoff",
        lines: [
          { label: "Formats", value: "9:16 · 4:5 · 1:1" },
          { label: "Bundle", value: "Strategy deck, prompt pack, shot list, guardrails" },
          { label: "Handoff", value: "Studio-ready, versioned" },
        ],
        metric: "1 bundle",
      };
  }
}
