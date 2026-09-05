import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-[10px] border border-border-strong bg-surface-2">
        <span className="absolute inset-0 rounded-[10px] bg-primary/15" />
        <svg viewBox="0 0 24 24" className="relative h-4 w-4" aria-hidden="true">
          <path
            d="M12 2.5 21 7.5v9L12 21.5 3 16.5v-9L12 2.5Z"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.6" fill="var(--primary)" />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-[15px] font-semibold tracking-tight">
          Creative<span className="text-primary">OS</span>
        </span>
      )}
    </div>
  );
}

export function PrototypeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      Independent prototype for HexCoded
    </span>
  );
}
