import { useState } from "react";
import { ArrowRight, Sparkles, Workflow, Wand2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EXAMPLE_BRIEFS } from "@/lib/creative-os/data";
import { PrototypeBadge } from "./Logo";

const STEPS = [
  "Parsing brief and market context",
  "Mapping audience tensions",
  "Composing the creative workflow graph",
  "Wiring guardrails and QA checks",
];

export function BriefScreen({
  brief,
  setBrief,
  onBuild,
  generating,
  genStep,
}: {
  brief: string;
  setBrief: (v: string) => void;
  onBuild: () => void;
  generating: boolean;
  genStep: number;
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-y-auto grid-field px-5 py-10">
      <div className="pointer-events-none absolute inset-0 hero-wash" />
      <div className="relative w-full max-w-3xl">
        <div className="rise-in text-center">
          <PrototypeBadge />
          <h1 className="text-balance-tight mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05]">
            Turn one brief into an entire
            <span className="text-primary"> creative workflow</span>
          </h1>
          <p className="text-balance-tight mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Creative OS plans the work the way a creative director does — audience, strategy, concepts,
            copy, art direction, prompts, shots, guardrails and QA — as one connected, editable graph.
          </p>
        </div>

        <div
          className={cn(
            "rise-in panel mt-8 rounded-2xl p-3 transition-colors sm:p-4",
            focus && "border-primary/45",
          )}
        >
          <label
            htmlFor="brief"
            className="px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            Campaign brief
          </label>
          <textarea
            id="brief"
            rows={2}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={generating}
            className="mt-2 w-full resize-none bg-transparent px-1 text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground sm:text-base"
            placeholder="Describe the campaign you need to build…"
          />
          <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_BRIEFS.slice(1).map((b) => (
                <button
                  key={b}
                  type="button"
                  disabled={generating}
                  onClick={() => setBrief(b)}
                  className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground disabled:opacity-50"
                >
                  {b.split(" ").slice(0, 4).join(" ")}…
                </button>
              ))}
            </div>
            <Button
              size="lg"
              className="ml-auto w-full font-medium sm:w-auto"
              onClick={onBuild}
              disabled={generating}
            >
              {generating ? "Building workflow…" : "Build workflow"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {generating ? (
          <div className="panel mt-5 rounded-xl p-4">
            <ul className="space-y-2.5">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-2.5 text-[12.5px] transition-colors",
                    i <= genStep ? "text-foreground" : "text-muted-foreground/50",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      i < genStep ? "bg-success" : i === genStep ? "bg-primary pulse-ring" : "bg-muted-foreground/40",
                    )}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Workflow, t: "Workflow, not chat", d: "Every output is a node you can inspect and rerun." },
              { icon: Wand2, t: "Direct it in language", d: "“Make it more premium” rewrites the connected nodes." },
              { icon: ShieldCheck, t: "Guardrails travel", d: "Brand rules and QA checks run before export." },
            ].map((f) => (
              <div key={f.t} className="rounded-xl border border-border bg-card/50 p-3.5">
                <f.icon className="h-4 w-4 text-primary" />
                <p className="mt-2.5 text-[13px] font-semibold">{f.t}</p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 flex items-center justify-center gap-1.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
          <Sparkles className="h-3 w-3" />
          Deterministic demo intelligence · no external model calls
        </p>
      </div>
    </div>
  );
}
