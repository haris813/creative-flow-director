import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, Loader2, Maximize2, Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { KIND_META } from "./kinds";
import { nodePayload } from "@/lib/creative-os/nodeContent";
import type { Campaign, Edge, WorkflowNode } from "@/lib/creative-os/types";

const NODE_W = 236;
const NODE_H = 132;

interface Props {
  nodes: WorkflowNode[];
  edges: Edge[];
  campaign: Campaign;
  selectedId: string | null;
  onSelect: (id: string) => void;
  revealed: string[];
  touched: string[];
}

export function Canvas({ nodes, edges, campaign, selectedId, onSelect, revealed, touched }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 0.72 });
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  const bounds = useMemo(() => {
    const maxX = Math.max(...nodes.map((n) => n.x)) + NODE_W;
    const maxY = Math.max(...nodes.map((n) => n.y)) + NODE_H;
    return { w: maxX + 60, h: maxY + 60 };
  }, [nodes]);

  const fit = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const k = Math.min((width - 64) / bounds.w, (height - 64) / bounds.h, 1);
    setView({ k, x: (width - bounds.w * k) / 2, y: (height - bounds.h * k) / 2 });
  }, [bounds]);

  useEffect(() => {
    fit();
    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fit]);

  const zoomBy = (f: number) =>
    setView((v) => {
      const el = wrapRef.current;
      const rect = el?.getBoundingClientRect();
      const cx = (rect?.width ?? 800) / 2;
      const cy = (rect?.height ?? 600) / 2;
      const k = Math.max(0.28, Math.min(1.6, v.k * f));
      return { k, x: cx - ((cx - v.x) / v.k) * k, y: cy - ((cy - v.y) / v.k) * k };
    });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "+" || e.key === "=") zoomBy(1.15);
      if (e.key === "-") zoomBy(1 / 1.15);
      if (e.key.toLowerCase() === "f") fit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fit]);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setView((v) => ({ ...v, x: d.vx + (e.clientX - d.x), y: d.vy + (e.clientY - d.y) }));
  };
  const endDrag = () => {
    drag.current = null;
  };

  const path = (a: WorkflowNode, b: WorkflowNode) => {
    const x1 = a.x + NODE_W;
    const y1 = a.y + NODE_H / 2;
    const x2 = b.x;
    const y2 = b.y + NODE_H / 2;
    const dx = Math.max(48, (x2 - x1) * 0.55);
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  };

  const visible = (id: string) => revealed.includes(id);

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full cursor-grab overflow-hidden grid-field active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="pointer-events-none absolute inset-0 hero-wash" />

      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`, width: bounds.w, height: bounds.h }}
      >
        <svg className="absolute inset-0 overflow-visible" width={bounds.w} height={bounds.h}>
          {edges.map((e) => {
            const a = nodes.find((n) => n.id === e.from)!;
            const b = nodes.find((n) => n.id === e.to)!;
            const on = visible(a.id) && visible(b.id);
            const hot =
              selectedId === a.id || selectedId === b.id || b.status === "running" || a.status === "running";
            return (
              <g key={`${e.from}-${e.to}`} opacity={on ? 1 : 0} className="transition-opacity duration-500">
                <path
                  d={path(a, b)}
                  fill="none"
                  stroke={hot ? "var(--primary)" : "var(--border-strong)"}
                  strokeWidth={hot ? 1.8 : 1.2}
                  className={cn("transition-all duration-300", b.status === "running" && "edge-flow")}
                />
                <circle cx={b.x} cy={b.y + NODE_H / 2} r={2.6} fill={hot ? "var(--primary)" : "var(--border-strong)"} />
              </g>
            );
          })}
        </svg>

        {nodes.map((n, i) => {
          const meta = KIND_META[n.kind];
          const Icon = meta.icon;
          const payload = nodePayload(n.id, campaign);
          const on = visible(n.id);
          const isTouched = touched.includes(n.id);
          return (
            <button
              key={n.id}
              data-node
              type="button"
              onClick={() => onSelect(n.id)}
              aria-pressed={selectedId === n.id}
              className={cn(
                "group absolute rounded-xl border bg-card/85 p-3.5 text-left node-shadow backdrop-blur transition-all duration-300",
                "hover:-translate-y-0.5 hover:border-border-strong focus-visible:-translate-y-0.5",
                selectedId === n.id ? "border-primary/70 ring-1 ring-primary/40" : "border-border",
                isTouched && "border-primary/50",
                on ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
              )}
              style={{
                left: n.x,
                top: n.y,
                width: NODE_W,
                minHeight: NODE_H,
                transitionDelay: on ? `${i * 45}ms` : "0ms",
              }}
            >
              <div className="flex items-center gap-2">
                <span className={cn("grid h-6 w-6 place-items-center rounded-md border", meta.bg, meta.border)}>
                  <Icon className={cn("h-3.5 w-3.5", meta.text)} />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {meta.label}
                </span>
                <span className="ml-auto">
                  {n.status === "running" && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />}
                  {n.status === "done" && <Check className="h-3.5 w-3.5 text-success" />}
                  {n.status === "queued" && <span className="block h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />}
                </span>
              </div>

              <p className="mt-2.5 font-display text-[15px] font-semibold leading-none">{n.title}</p>
              <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-muted-foreground">{payload.summary}</p>

              <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground/80">
                  {payload.metric}
                </span>
                {isTouched && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                    updated
                  </span>
                )}
              </div>

              {n.status === "running" && (
                <span className="pointer-events-none absolute inset-0 rounded-xl pulse-ring" />
              )}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-lg border border-border bg-surface/90 p-1 backdrop-blur">
        <CtrlBtn label="Zoom out" onClick={() => zoomBy(1 / 1.15)}>
          <Minus className="h-3.5 w-3.5" />
        </CtrlBtn>
        <span className="w-12 text-center font-mono text-[11px] text-muted-foreground">
          {Math.round(view.k * 100)}%
        </span>
        <CtrlBtn label="Zoom in" onClick={() => zoomBy(1.15)}>
          <Plus className="h-3.5 w-3.5" />
        </CtrlBtn>
        <span className="mx-1 h-4 w-px bg-border" />
        <CtrlBtn label="Fit to view" onClick={fit}>
          <Maximize2 className="h-3.5 w-3.5" />
        </CtrlBtn>
        <CtrlBtn
          label="Center on selection"
          onClick={() => {
            const n = nodes.find((x) => x.id === selectedId);
            const el = wrapRef.current;
            if (!n || !el) return fit();
            const r = el.getBoundingClientRect();
            setView((v) => ({ ...v, x: r.width / 2 - (n.x + NODE_W / 2) * v.k, y: r.height / 2 - (n.y + NODE_H / 2) * v.k }));
          }}
        >
          <Crosshair className="h-3.5 w-3.5" />
        </CtrlBtn>
      </div>

      {/* Minimap */}
      <div className="absolute bottom-4 right-4 hidden h-[104px] w-[168px] overflow-hidden rounded-lg border border-border bg-surface/90 p-1.5 backdrop-blur md:block">
        <svg viewBox={`0 0 ${bounds.w} ${bounds.h}`} className="h-full w-full">
          {edges.map((e) => {
            const a = nodes.find((n) => n.id === e.from)!;
            const b = nodes.find((n) => n.id === e.to)!;
            return (
              <line
                key={`m-${e.from}-${e.to}`}
                x1={a.x + NODE_W}
                y1={a.y + NODE_H / 2}
                x2={b.x}
                y2={b.y + NODE_H / 2}
                stroke="var(--border-strong)"
                strokeWidth={4}
              />
            );
          })}
          {nodes.map((n) => (
            <rect
              key={`mm-${n.id}`}
              x={n.x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx={14}
              fill={selectedId === n.id ? "var(--primary)" : KIND_META[n.kind].stroke}
              opacity={visible(n.id) ? (selectedId === n.id ? 1 : 0.45) : 0.1}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function CtrlBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      {children}
    </button>
  );
}
