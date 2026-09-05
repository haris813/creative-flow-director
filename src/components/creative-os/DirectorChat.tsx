import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QUICK_PROMPTS } from "@/lib/creative-os/director";
import type { DirectorMessage } from "@/lib/creative-os/types";

export function DirectorChat({
  open,
  onClose,
  messages,
  thinking,
  onSend,
}: {
  open: boolean;
  onClose: () => void;
  messages: DirectorMessage[];
  thinking: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, thinking]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const submit = () => {
    const t = value.trim();
    if (!t || thinking) return;
    onSend(t);
    setValue("");
  };

  return (
    <div
      className={cn(
        "absolute inset-y-0 right-0 z-30 flex w-full max-w-[420px] flex-col border-l border-border bg-surface/95 backdrop-blur-xl transition-transform duration-300",
        open ? "translate-x-0" : "pointer-events-none translate-x-full",
      )}
      aria-hidden={!open}
    >
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="grid h-7 w-7 place-items-center rounded-md border border-primary/30 bg-primary/10">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold leading-none">AI Creative Director</p>
          <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Edits the workflow, not just the text
          </p>
        </div>
        <button
          type="button"
          aria-label="Close director"
          onClick={onClose}
          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="scroll-slim flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div key={m.id} className={cn("rise-in", m.role === "user" && "flex justify-end")}>
            {m.role === "user" ? (
              <p className="max-w-[85%] rounded-2xl rounded-br-sm border border-border-strong bg-surface-2 px-3.5 py-2.5 text-[13px] leading-relaxed">
                {m.text}
              </p>
            ) : (
              <div className="max-w-[95%]">
                <p className="rounded-2xl rounded-bl-sm border border-border bg-card/70 px-3.5 py-3 text-[13px] leading-relaxed text-foreground/90">
                  {m.text}
                </p>
                {!!m.changes?.length && (
                  <ul className="mt-2 space-y-1 rounded-lg border border-primary/20 bg-primary/[0.06] p-2.5">
                    {m.changes.map((c) => (
                      <li key={c} className="flex gap-2 text-[11.5px] leading-relaxed text-foreground/80">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
        {thinking && (
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            Rewriting connected nodes…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-3">
        <div className="scroll-slim mb-2 flex gap-1.5 overflow-x-auto pb-1">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onSend(p)}
              disabled={thinking}
              className="shrink-0 rounded-full border border-border bg-surface-2/70 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2 rounded-xl border border-border bg-card/70 p-2 focus-within:border-primary/50">
          <textarea
            ref={inputRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Direct the workflow…"
            className="max-h-28 flex-1 resize-none bg-transparent px-1.5 py-1 text-[13px] outline-none placeholder:text-muted-foreground"
          />
          <Button size="icon" className="h-8 w-8 shrink-0" onClick={submit} disabled={thinking || !value.trim()}>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
