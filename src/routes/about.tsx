import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Logo, PrototypeBadge } from "@/components/creative-os/Logo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About this submission · Creative OS" },
      {
        name: "description",
        content:
          "An independent prototype built for a HexCoded product-role application: the problem, the insight, what was built, and what comes next. Not affiliated with HexCoded.",
      },
      { property: "og:title", content: "About this submission · Creative OS" },
      {
        property: "og:description",
        content:
          "Independent prototype for a HexCoded product-role application — problem, insight, build and next explorations.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const BLOCKS: { title: string; body: string[] }[] = [
  {
    title: "The problem",
    body: [
      "Creative AI tools have solved generation. A team can produce an image, a caption or a cutdown in seconds.",
      "What they have not solved is orchestration: deciding what to make, in what order, under which brand rules, and how each output justifies the one before it. That work still lands on a human, in a chat window, with no structure to hand to anyone else.",
    ],
  },
  {
    title: "The insight",
    body: [
      "The scarce thing is not the asset. It is a defensible chain of decisions a brand can sign off on.",
      "So the workflow itself should be the product — a graph where audience, strategy, concepts, copy, art direction, prompts, shots, guardrails and QA are all inspectable, editable nodes rather than disposable chat replies.",
    ],
  },
  {
    title: "What was built",
    body: [
      "A brief-to-workflow generator that turns any campaign brief into an eleven-node creative graph, with brief-aware output across several category profiles.",
      "An interactive canvas with pan, zoom, fit-to-view, minimap and node selection, backed by an inspector that shows each node's structured output and lets you regenerate it.",
      "An AI creative director panel where natural-language direction — make it more premium, give me bolder concepts, reduce production complexity — visibly rewrites the affected nodes.",
      "A sequential run mode with per-node execution states, ending in a campaign workspace: strategy, audience, three concepts with side-by-side comparison, hooks, CTAs, art direction, image prompts, a shot list, guardrails and a QA checklist.",
      "A presentation mode for demoing, plus a product-thinking panel covering assumptions, next experiments and metrics.",
    ],
  },
  {
    title: "What I'd explore next",
    body: [
      "Plugging a real model behind the same interface — the director layer is a pure function today, so swapping it for a provider call changes nothing above it.",
      "Versioning and branching: fork a workflow at the concept node and compare two directions with real outputs.",
      "Team review — comments and approvals attached to nodes, so guardrail sign-off happens inside the graph rather than in a separate deck.",
      "Instrumenting the metrics named in the product-thinking panel: time-to-first-concept, workflow completion, regeneration rate, export rate and edits per workflow.",
    ],
  },
];

function About() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to workspace
          </Link>
          <Logo className="ml-auto" />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <PrototypeBadge />
        <h1 className="text-balance-tight mt-5 font-display text-[clamp(1.9rem,4.5vw,2.75rem)] font-semibold leading-[1.08]">
          Creative OS — an independent product submission
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          This is an independent prototype created for a HexCoded product-role application. It is{" "}
          <strong className="text-foreground">not affiliated with, endorsed by, or official HexCoded software</strong>.
          All content, data and intelligence in the demo are mocked and deterministic — no external model is called.
        </p>

        <div className="mt-10 space-y-9">
          {BLOCKS.map((b) => (
            <section key={b.title}>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{b.title}</h2>
              <div className="mt-3 space-y-3">
                {b.body.map((p) => (
                  <p key={p} className="text-[14px] leading-relaxed text-foreground/85">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-border bg-card/60 p-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Links</h2>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            <Link
              to="/"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-[13px] transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Live demo
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <a
              href="#repository"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-[13px] transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Repository <span className="text-muted-foreground">(add link)</span>
              <Github className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground">
            Repository placeholder — replace the href above with the public repo URL before sending.
          </p>
        </section>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
          Independent prototype · not affiliated with HexCoded
        </p>
      </div>
    </main>
  );
}
