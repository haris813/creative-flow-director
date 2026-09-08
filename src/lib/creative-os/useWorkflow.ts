import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EDGES, NODES, NODE_ORDER, DEMO_BRIEF } from "./data";
import { generateCampaign as baseCampaign } from "./workflowGenerator";
import { runDirector } from "./director";
import type { Campaign, DirectorMessage, WorkflowNode } from "./types";

export type Phase = "brief" | "generating" | "canvas" | "running" | "results";

let seq = 0;
const uid = () => `m${++seq}`;

/**
 * Single source of truth for the demo. All "intelligence" is deterministic and
 * local (see ./director). Swapping in a real provider means replacing the
 * runDirector call with an async request — the contract is unchanged.
 */
export function useWorkflow() {
  const [phase, setPhase] = useState<Phase>("brief");
  const [brief, setBrief] = useState(DEMO_BRIEF);
  const [campaign, setCampaign] = useState<Campaign>(() => baseCampaign(DEMO_BRIEF));
  const [nodes, setNodes] = useState<WorkflowNode[]>(NODES);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [touched, setTouched] = useState<string[]>([]);
  const [messages, setMessages] = useState<DirectorMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [runIndex, setRunIndex] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const build = useCallback(
    (nextBrief: string) => {
      clearTimers();
      const b = nextBrief.trim() || DEMO_BRIEF;
      setBrief(b);
      setCampaign(baseCampaign(b));
      setNodes(NODES.map((n) => ({ ...n, status: "idle" })));
      setRevealed([]);
      setTouched([]);
      setSelectedId(null);
      setMessages([]);
      setRunIndex(-1);
      setGenStep(0);
      setPhase("generating");

      [1, 2, 3].forEach((s) => later(() => setGenStep(s), s * 620));
      later(() => {
        setPhase("canvas");
        NODE_ORDER.forEach((id, i) =>
          later(() => {
            setRevealed((r) => [...r, id]);
            if (i === NODE_ORDER.length - 1) {
              setSelectedId("brief");
              toast.success("Workflow generated", {
                description: `${NODE_ORDER.length} connected nodes ready to run.`,
              });
            }
          }, i * 90),
        );
      }, 2500);
    },
    [later],
  );

  const run = useCallback(() => {
    if (phase === "running") return;
    clearTimers();
    setPhase("running");
    setRunIndex(0);
    setNodes((ns) => ns.map((n) => ({ ...n, status: "queued" })));

    NODE_ORDER.forEach((id, i) => {
      later(() => {
        setRunIndex(i);
        setSelectedId(id);
        setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, status: "running" } : n)));
      }, i * 460);
      later(
        () =>
          setNodes((ns) =>
            ns.map((n) => (n.id === id ? { ...n, status: "done", updatedAt: Date.now() } : n)),
          ),
        i * 460 + 380,
      );
    });

    later(
      () => {
        setPhase("results");
        setRunIndex(-1);
        toast.success("Campaign workspace ready", {
          description: "Strategy, concepts, copy, prompts, shots and QA are packaged.",
        });
      },
      NODE_ORDER.length * 460 + 500,
    );
  }, [later, phase]);

  const send = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || thinking) return;
      setMessages((m) => [...m, { id: uid(), role: "user", text: t, at: Date.now() }]);
      setThinking(true);
      later(() => {
        const res = runDirector(t, campaign);
        setCampaign(res.campaign);
        setTouched(res.touched);
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: "director",
            text: res.reply,
            changes: res.changes,
            touched: res.touched,
            at: Date.now(),
          },
        ]);
        setThinking(false);
        if (res.touched.length) {
          setNodes((ns) =>
            ns.map((n) => (res.touched.includes(n.id) ? { ...n, status: "done", updatedAt: Date.now() } : n)),
          );
          setSelectedId(res.touched[0]!);
          toast(`${res.changes.length} node${res.changes.length === 1 ? "" : "s"} updated`, {
            description: res.changes[0],
          });
        } else {
          toast("Need one more detail", { description: "Tell the director which layer to move." });
        }
      }, 950);
    },
    [campaign, later, thinking],
  );

  const regenerate = useCallback(
    (id: string) => {
      setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, status: "running" } : n)));
      later(() => {
        setNodes((ns) =>
          ns.map((n) => (n.id === id ? { ...n, status: "done", updatedAt: Date.now() } : n)),
        );
        setTouched((t) => Array.from(new Set([...t, id])));
        toast.success("Node regenerated", { description: "Downstream nodes kept in sync." });
      }, 900);
    },
    [later],
  );

  const reset = useCallback(() => {
    clearTimers();
    setPhase("brief");
    setNodes(NODES.map((n) => ({ ...n, status: "idle" })));
    setRevealed([]);
    setTouched([]);
    setSelectedId(null);
    setMessages([]);
    setThinking(false);
    setRunIndex(-1);
    setCampaign(baseCampaign(brief));
  }, [brief]);

  return {
    phase,
    setPhase,
    brief,
    setBrief,
    campaign,
    nodes,
    edges: EDGES,
    revealed,
    selectedId,
    setSelectedId,
    touched,
    messages,
    thinking,
    genStep,
    runIndex,
    build,
    run,
    send,
    regenerate,
    reset,
  };
}
