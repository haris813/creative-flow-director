# Creative OS — Roadmap

## Current state (verified)
- Design system, Canvas (custom SVG/pan/zoom/minimap), Inspector, DirectorChat, BriefScreen, Results, ProductThinking, Logo exist and build OK.
- `src/routes/index.tsx` is STILL the template placeholder — the workspace page has never been wired up.
- `useWorkflow.ts` is single-workflow; `data.ts` is a hardcoded sneaker campaign; `director.ts` rewrites sneaker-specific text; `nodeContent.ts` hardcodes brief deliverables/constraint and export lines.

## Ready items (in order)
1. Types: add `WorkflowProject` (id, name, brief, campaign, nodes, edges, selectedNodeId, messages, touched, phase, runIndex, compare state, createdAt, updatedAt). Extend `Campaign` with inferred `profile` (category, audience, geography, objective, tone, channels, constraints, deliverables).
2. `workflowGenerator.ts`: brief → seeded, category-aware Campaign (sneaker / dev-tool / EV / coffee / skincare / fintech / generic). All nodes' content derived from brief. Replace `baseCampaign()` usage.
3. `director.ts`: make edits workflow-generic (operate on campaign profile, not sneaker strings); add "culturally relevant to India" intent.
4. `useWorkflows.ts` store: map of projects + activeWorkflowId, localStorage persistence with safe parse, create/rename/duplicate(deep clone)/delete/reset, last-workflow protection, per-workflow timers.
5. Workspace page at `/` (rewrite `src/routes/index.tsx`): top bar (logo, prototype badge, workflow switcher, Run, Director, Demo mode, Product Thinking, About), sidebar of workflows, brief screen for new workflows, canvas + inspector + director drawer, results view.
6. `nodeContent.ts`: remove hardcoded brief/export lines; derive from campaign profile.
7. Canvas: keyboard `0` (fit) + Escape (deselect), clear-connections toggle, status legend.
8. Results: derive shot count/all sections from campaign; Back to Canvas; comparison view per workflow.
9. Demo mode: presentation chrome-hide + guided example using the same generator.
10. `/about` submission route + head() metadata on `/` and `/about`; fonts via `<link>` in `__root.tsx`; mount `<Toaster />`.
11. Verify with Playwright: 3 test briefs differ; data-isolation test (A/B/duplicate/delete); persistence after reload; mobile layout; console clean.
