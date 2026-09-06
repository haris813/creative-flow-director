import { useState } from "react";
import { Check, Copy, GitCompare, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Campaign, Concept } from "@/lib/creative-os/types";

const TABS = [
  { id: "strategy", label: "Strategy" },
  { id: "concepts", label: "Concepts" },
  { id: "copy", label: "Copy & hooks" },
  { id: "visual", label: "Art direction" },
  { id: "prompts", label: "Prompts" },
  { id: "shots", label: "Video shots" },
  { id: "governance", label: "Guardrails & QA" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{title}</h3>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function CopyLine({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setDone(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setDone(false), 1400);
      }}
      className="group flex w-full items-start gap-3 rounded-lg border border-border bg-card/60 p-3 text-left transition-colors hover:border-border-strong"
    >
      <span className="flex-1 text-[13px] leading-relaxed text-foreground/90">{text}</span>
      {done ? (
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
      ) : (
        <Copy className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ConceptCard({
  c,
  selected,
  onToggle,
}: {
  c: Concept;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card/60 p-4 transition-colors",
        selected ? "border-primary/60 ring-1 ring-primary/25" : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-semibold">{c.name}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{c.premise}</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wider transition-colors",
            selected
              ? "border-primary/50 bg-primary/15 text-primary"
              : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
          )}
        >
          {selected ? "Comparing" : "Compare"}
        </button>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-foreground/85">
        <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">Hero · </span>
        {c.hero}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.tone.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-surface-2/60 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground"
          >
            {t}
          </span>
        ))}
        <span className="rounded-full border border-border bg-surface-2/60 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
          {c.production} production
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Meter label="Boldness" value={c.boldness} />
        <Meter label="Premium" value={c.premium} />
      </div>
    </div>
  );
}

export function Results({
  campaign,
  onAsk,
  onBackToCanvas,
}: {
  campaign: Campaign;
  onAsk: (prompt: string) => void;
  onBackToCanvas: () => void;
}) {
  const [tab, setTab] = useState<TabId>("strategy");
  const [compare, setCompare] = useState<string[]>([]);

  const toggle = (id: string) =>
    setCompare((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= 2 ? [cur[1]!, id] : [...cur, id],
    );

  const compared = campaign.concepts.filter((c) => compare.includes(c.id));
  const done = campaign.qa.filter((q) => q.done).length;

  return (
    <div className="scroll-slim h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl px-5 py-7">
        <div className="rise-in flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Campaign workspace</p>
            <h2 className="mt-1.5 font-display text-2xl font-semibold sm:text-[28px]">{campaign.strategy.bigIdea}</h2>
            <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
              {campaign.brief} · {campaign.market} · {campaign.audience.label}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={onBackToCanvas}>
            Back to canvas
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { k: "Concepts", v: `${campaign.concepts.length}` },
            { k: "Hooks", v: `${campaign.hooks.length}` },
            { k: "Assets specced", v: `${campaign.imagePrompts.length + campaign.shots.length}` },
            { k: "QA passing", v: `${done}/${campaign.qa.length}` },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-border bg-card/50 p-3">
              <p className="font-display text-xl font-semibold">{s.v}</p>
              <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>

        <div className="scroll-slim mt-6 flex gap-1 overflow-x-auto border-b border-border pb-px">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id}
              className={cn(
                "-mb-px shrink-0 border-b-2 px-3 py-2 text-[12.5px] font-medium transition-colors",
                tab === t.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-6 pb-10">
          {tab === "strategy" && (
            <>
              <Section title="Positioning">
                <p className="text-[14px] leading-relaxed">{campaign.strategy.positioning}</p>
              </Section>
              <Section title="Audience">
                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <p className="text-[13.5px] font-semibold">{campaign.audience.label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {campaign.audience.mindset}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {campaign.audience.tensions.map((t) => (
                      <li key={t} className="flex gap-2 text-[12.5px] leading-relaxed text-foreground/85">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {campaign.audience.channels.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-border bg-surface-2/60 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Section>
              <Section title="Proof points">
                <ul className="grid gap-2 sm:grid-cols-3">
                  {campaign.strategy.proofPoints.map((p) => (
                    <li key={p} className="rounded-lg border border-border bg-card/60 p-3 text-[12.5px] leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          )}

          {tab === "concepts" && (
            <>
              <div className="grid gap-3 lg:grid-cols-3">
                {campaign.concepts.map((c) => (
                  <ConceptCard key={c.id} c={c} selected={compare.includes(c.id)} onToggle={() => toggle(c.id)} />
                ))}
              </div>
              <div className="rounded-xl border border-border bg-surface/60 p-4">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <GitCompare className="h-3.5 w-3.5" /> Concept comparison
                </p>
                {compared.length < 2 ? (
                  <p className="mt-2.5 text-[12.5px] text-muted-foreground">
                    Select two concepts above to compare premise, production load, boldness and premium read
                    side by side.
                  </p>
                ) : (
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {compared.map((c) => (
                      <div key={c.id} className="space-y-3">
                        <p className="font-display text-[15px] font-semibold">{c.name}</p>
                        <p className="text-[12.5px] leading-relaxed text-muted-foreground">{c.premise}</p>
                        <Meter label="Boldness" value={c.boldness} />
                        <Meter label="Premium" value={c.premium} />
                        <p className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                          {c.production} production · {c.tone.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {compared.length === 2 && (
                  <p className="mt-4 border-t border-border pt-3 text-[12.5px] leading-relaxed text-foreground/85">
                    <span className="text-primary">Director read: </span>
                    {compared[0]!.boldness > compared[1]!.boldness ? compared[0]!.name : compared[1]!.name} buys more
                    attention;{" "}
                    {compared[0]!.premium > compared[1]!.premium ? compared[0]!.name : compared[1]!.name} protects the
                    price position. Lead with the safer one and use the bolder one as the social layer.
                  </p>
                )}
              </div>
              <Button variant="secondary" size="sm" onClick={() => onAsk("Give me 3 bolder concepts")}>
                <Sparkles className="mr-2 h-3.5 w-3.5" /> Ask for 3 bolder concepts
              </Button>
            </>
          )}

          {tab === "copy" && (
            <>
              <Section title="Hooks">
                <div className="space-y-2">
                  {campaign.hooks.map((h) => (
                    <CopyLine key={h} text={h} />
                  ))}
                </div>
              </Section>
              <Section title="Calls to action">
                <div className="flex flex-wrap gap-2">
                  {campaign.ctas.map((c) => (
                    <span key={c} className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-[12.5px]">
                      {c}
                    </span>
                  ))}
                </div>
              </Section>
              <Button variant="secondary" size="sm" onClick={() => onAsk("Make the hooks more provocative")}>
                <Sparkles className="mr-2 h-3.5 w-3.5" /> Make the hooks more provocative
              </Button>
            </>
          )}

          {tab === "visual" && (
            <>
              <Section title="Direction">
                <p className="text-[14px] leading-relaxed">{campaign.visual.direction}</p>
              </Section>
              <Section title="Palette">
                <div className="flex gap-2">
                  {campaign.visual.palette.map((p) => (
                    <div key={p.name} className="flex-1">
                      <div
                        className="h-16 rounded-lg border border-border"
                        style={{ backgroundColor: p.value }}
                        title={p.value}
                      />
                      <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                        {p.name}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
              <div className="grid gap-3 sm:grid-cols-2">
                <Section title="Typography">
                  <p className="text-[13px] leading-relaxed text-foreground/90">{campaign.visual.typography}</p>
                </Section>
                <Section title="Lighting">
                  <p className="text-[13px] leading-relaxed text-foreground/90">{campaign.visual.lighting}</p>
                </Section>
              </div>
              <Section title="References">
                <div className="flex flex-wrap gap-1.5">
                  {campaign.visual.references.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 text-[11.5px] text-muted-foreground"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </Section>
            </>
          )}

          {tab === "prompts" && (
            <Section title={`${campaign.imagePrompts.length} generation-ready image prompts`}>
              <div className="space-y-2">
                {campaign.imagePrompts.map((p, i) => (
                  <div key={p} className="rounded-lg border border-border bg-card/60 p-3">
                    <p className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                      Still {i + 1}
                    </p>
                    <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-foreground/90">{p}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11.5px] text-muted-foreground">
                Prompts are written for an image model but nothing is generated in this prototype.
              </p>
            </Section>
          )}

          {tab === "shots" && (
            <Section title="Short-form shot list · 9:16">
              <div className="overflow-hidden rounded-xl border border-border">
                {campaign.shots.map((s, i) => (
                  <div
                    key={s.id}
                    className={cn(
                      "grid grid-cols-[86px_1fr] gap-3 p-3 sm:grid-cols-[100px_1fr_1fr]",
                      i > 0 && "border-t border-border",
                    )}
                  >
                    <span className="font-mono text-[11px] text-primary">{s.time}</span>
                    <span className="text-[12.5px] leading-relaxed">{s.shot}</span>
                    <span className="col-span-2 text-[11.5px] leading-relaxed text-muted-foreground sm:col-span-1">
                      {s.note}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {tab === "governance" && (
            <>
              <Section title="Brand guardrails">
                <ul className="space-y-2">
                  {campaign.guardrails.map((g) => (
                    <li
                      key={g}
                      className="flex gap-2.5 rounded-lg border border-border bg-card/60 p-3 text-[12.5px] leading-relaxed"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-destructive" />
                      {g}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title={`QA checklist · ${done}/${campaign.qa.length} passing`}>
                <ul className="space-y-2">
                  {campaign.qa.map((q) => (
                    <li key={q.id} className="flex items-center gap-2.5 rounded-lg border border-border bg-card/60 p-3">
                      <span
                        className={cn(
                          "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                          q.done ? "border-success/50 bg-success/15" : "border-border",
                        )}
                      >
                        {q.done && <Check className="h-2.5 w-2.5 text-success" />}
                      </span>
                      <span className={cn("text-[12.5px]", !q.done && "text-muted-foreground")}>{q.label}</span>
                      <span className="ml-auto font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                        {q.done ? "Pass" : "Open"}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
