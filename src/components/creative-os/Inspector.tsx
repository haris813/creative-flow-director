import { RefreshCw, Wand2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KIND_META } from "./kinds";
import { nodePayload } from "@/lib/creative-os/nodeContent";
import type { Campaign, WorkflowNode } from "@/lib/creative-os/types";

export function Inspector({
  node,
  campaign,
  onClose,
  onAsk,
  onRegenerate,
}: {
  node: WorkflowNode | null;
  campaign: Campaign;
  onClose: () => void;
  onAsk: (prompt: string) => void;
  onRegenerate: (id: string) => void;
}) {
  if (!node) {
    return (
      <aside className="hidden w-[320px] shrink-0 border-l border-border bg-surface/50 lg:block">
        <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2">
            <Wand2 className="h-4 w-4 text-muted-foreground" />
          </span>
          <p className="text-sm font-medium">No node selected</p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Select any node on the canvas to inspect its structured output, or ask the creative director to
            rewrite it.
          </p>
        </div>
      </aside>
    );
  }

  const meta = KIND_META[node.kind];
  const Icon = meta.icon;
  const payload = nodePayload(node.id, campaign);

  return (
    <aside className="w-full shrink-0 border-l border-border bg-surface/50 lg:w-[320px]">
      <div className="flex h-full flex-col">
        <div className="flex items-start gap-3 border-b border-border px-4 py-3.5">
          <span className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border", meta.bg, meta.border)}>
            <Icon className={cn("h-3.5 w-3.5", meta.text)} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
              {meta.label} · {node.kicker}
            </p>
            <h3 className="mt-0.5 truncate text-sm font-semibold">{node.title}</h3>
          </div>
          <button
            type="button"
            aria-label="Close inspector"
            onClick={onClose}
            className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="scroll-slim flex-1 overflow-y-auto px-4 py-4">
          <p className="text-[13px] leading-relaxed text-foreground/90">{payload.summary}</p>

          {node.id === "visual" && (
            <div className="mt-4 flex gap-1.5">
              {campaign.visual.palette.map((p) => (
                <div key={p.name} className="flex-1">
                  <div
                    className="h-9 rounded-md border border-border"
                    style={{ backgroundColor: p.value }}
                    title={`${p.name} ${p.value}`}
                  />
                  <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    {p.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 space-y-2.5">
            {payload.lines.map((l, i) => (
              <div key={i} className="rounded-lg border border-border bg-card/60 p-3">
                {l.label && (
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    {l.label}
                  </p>
                )}
                <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/90">{l.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 border-t border-border p-3">
          <Button variant="secondary" size="sm" className="w-full" onClick={() => onRegenerate(node.id)}>
            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Regenerate node
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={() => onAsk(`Rewrite the ${node.title.toLowerCase()} node`)}
          >
            Ask the director about this node
          </Button>
        </div>
      </div>
    </aside>
  );
}
