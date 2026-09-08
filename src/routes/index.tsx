import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Info, MessageSquare, Play, Presentation, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BriefScreen } from "@/components/creative-os/BriefScreen";
import { Canvas } from "@/components/creative-os/Canvas";
import { DirectorChat } from "@/components/creative-os/DirectorChat";
import { Inspector } from "@/components/creative-os/Inspector";
import { Logo, PrototypeBadge } from "@/components/creative-os/Logo";
import { ProductThinking } from "@/components/creative-os/ProductThinking";
import { Results } from "@/components/creative-os/Results";
import { useWorkflow } from "@/lib/creative-os/useWorkflow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creative OS — AI Creative Workflow Director" },
      {
        name: "description",
        content:
          "Turn a campaign brief into an editable, executable creative workflow: audience, strategy, concepts, copy, art direction, prompts, shots, guardrails and QA as one connected graph.",
      },
      { property: "og:title", content: "Creative OS — AI Creative Workflow Director" },
      {
        property: "og:description",
        content:
          "An independent prototype where the creative workflow itself is the product — brief in, connected and directable campaign graph out.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Workspace,
});

function Workspace() {
  const wf = useWorkflow();
  const [chatOpen, setChatOpen] = useState(false);
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const [presenting, setPresenting] = useState(false);

  const selectedNode = wf.nodes.find((n) => n.id === wf.selectedId) ?? null;
  const onCanvas = wf.phase === "canvas" || wf.phase === "running";
  const showBrief = wf.phase === "brief" || wf.phase === "generating";

  const ask = (prompt: string) => {
    setChatOpen(true);
    wf.send(prompt);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (chatOpen) setChatOpen(false);
        else if (thinkingOpen) setThinkingOpen(false);
        else if (presenting) setPresenting(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen, thinkingOpen, presenting]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      {!presenting && (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface/60 px-3 backdrop-blur sm:px-4">
          <Logo />
          <PrototypeBadge className="hidden md:inline-flex" />

          <div className="ml-auto flex items-center gap-1.5">
            {onCanvas && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hidden sm:inline-flex"
                  onClick={wf.reset}
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  New brief
                </Button>
                <Button size="sm" variant="outline" onClick={() => setChatOpen(true)}>
                  <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Director</span>
                </Button>
                <Button size="sm" onClick={wf.run} disabled={wf.phase === "running"}>
                  <Play className="mr-1.5 h-3.5 w-3.5" />
                  {wf.phase === "running" ? "Running…" : "Run workflow"}
                </Button>
              </>
            )}
            {wf.phase === "results" && (
              <Button size="sm" variant="outline" onClick={wf.reset}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                New brief
              </Button>
            )}
            <button
              type="button"
              onClick={() => setPresenting(true)}
              title="Presentation mode"
              aria-label="Presentation mode"
              className="hidden h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid"
            >
              <Presentation className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setThinkingOpen(true)}
              title="Why this exists"
              aria-label="Why this exists"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Info className="h-4 w-4" />
            </button>
            <Link
              to="/about"
              className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              About
            </Link>
          </div>
        </header>
      )}

      {presenting && (
        <button
          type="button"
          onClick={() => setPresenting(false)}
          className="fixed right-4 top-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3 w-3" />
          Exit presentation
        </button>
      )}

      <main className="relative flex min-h-0 flex-1">
        {showBrief && (
          <BriefScreen
            brief={wf.brief}
            setBrief={wf.setBrief}
            onBuild={() => wf.build(wf.brief)}
            generating={wf.phase === "generating"}
            genStep={wf.genStep}
          />
        )}

        {onCanvas && (
          <div className="flex min-h-0 min-w-0 flex-1">
            <div className="relative min-w-0 flex-1">
              <Canvas
                nodes={wf.nodes}
                edges={wf.edges}
                campaign={wf.campaign}
                selectedId={wf.selectedId}
                onSelect={wf.setSelectedId}
                revealed={wf.revealed}
                touched={wf.touched}
              />
              {wf.phase === "running" && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-surface-2">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${Math.max(0, ((wf.runIndex + 1) / wf.nodes.length) * 100)}%`,
                    }}
                  />
                </div>
              )}
            </div>
            <div className={cn(presenting && "hidden")}>
              <Inspector
                node={selectedNode}
                campaign={wf.campaign}
                onClose={() => wf.setSelectedId(null)}
                onAsk={ask}
                onRegenerate={wf.regenerate}
              />
            </div>
          </div>
        )}

        {wf.phase === "results" && (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Results campaign={wf.campaign} onAsk={ask} onBackToCanvas={() => wf.setPhase("canvas")} />
          </div>
        )}
      </main>

      <DirectorChat
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        messages={wf.messages}
        thinking={wf.thinking}
        onSend={wf.send}
      />
      <ProductThinking open={thinkingOpen} onClose={() => setThinkingOpen(false)} />
    </div>
  );
}
