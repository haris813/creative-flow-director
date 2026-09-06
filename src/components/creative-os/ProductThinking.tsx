import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const BLOCKS = [
  {
    title: "Why this exists",
    items: [
      "AI creative tools output isolated assets; teams still hand-assemble strategy, copy, art direction and QA.",
      "The scarce thing is not generation — it is a defensible chain of decisions a brand can sign off on.",
      "Creative OS makes the workflow itself the product: every output is a node with an owner and a rule.",
    ],
  },
  {
    title: "Assumptions",
    items: [
      "Teams will accept AI planning if each step stays inspectable and editable.",
      "Direction in natural language beats form-filling for creative leads.",
      "Guardrails and QA are the wedge into brand and agency adoption.",
    ],
  },
  {
    title: "Next experiments",
    items: [
      "Plug a real model per node type and compare against the deterministic baseline.",
      "Branch and version workflows so two strategies can be run side by side.",
      "Import real brand books and auto-derive guardrails.",
    ],
  },
  {
    title: "Metrics that matter",
    items: [
      "Time from brief to approved concept set.",
      "Share of nodes edited vs. accepted as generated.",
      "Guardrail violations caught before publish.",
    ],
  },
];

export function ProductThinking({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-40 transition-opacity duration-200",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close product thinking"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />
      <div
        className={cn(
          "scroll-slim absolute inset-y-0 right-0 w-full max-w-[520px] overflow-y-auto border-l border-border bg-surface p-5 transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Product thinking</p>
            <h2 className="mt-1 font-display text-xl font-semibold">Why this exists</h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {BLOCKS.map((b) => (
            <section key={b.title}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{b.title}</h3>
              <ul className="mt-2 space-y-2">
                {b.items.map((i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 rounded-lg border border-border bg-card/60 p-3 text-[12.5px] leading-relaxed text-foreground/90"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {i}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
