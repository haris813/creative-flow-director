# Creative Canvas AI

Build the complete hiring-submission prototype described below. Treat this as a high-stakes product-design/build exercise for a HexCoded product role. Do not make a generic AI dashboard or a marketing-only landing page. The first screen must immediately demonstrate the product and the entire experience must feel polished enough to show a product hiring manager.

PRODUCT: “Creative OS — AI Creative Workflow Director”. It is an independent prototype inspired by the problem space described by HexCoded’s hiring email: node-based workflows in Creative Studio, agentic chats for content creation, and creative AI products. It is NOT affiliated with or official HexCoded software.

CORE INSIGHT: Creative AI tools are excellent at generating assets but often leave the user to orchestrate the creative process. Creative OS makes the workflow itself the product: an AI creative director turns a campaign brief into an editable, executable creative workflow and lets the user modify it conversationally.

PRIMARY DEMO FLOW:
1. Open directly into a premium Creative OS workspace.
2. Show a command/brief area with example briefs and a prominent “Try Demo” action. Include a compelling preloaded sneaker campaign brief: “Launch a premium sneaker collection for Gen Z in India.”
3. On Build Workflow/Try Demo, animate a workflow being generated and reveal an interactive canvas.
4. Canvas contains connected nodes: Brief, Audience, Creative Strategy, Concepts, Copy & Hooks, Visual Direction, Image Prompts, Video Shots, Brand Guardrails, QA, Export. Nodes are selectable, visually differentiated by type, and show meaningful structured content.
5. Include canvas zoom controls, fit-to-view, minimap, node selection, clear connections, and an inspector panel. Interactions must actually work.
6. Include an AI Creative Director chat drawer/panel. Users can type requests such as “Make it more premium”, “Give me 3 bolder concepts”, “Change the audience to college students”, “Reduce production complexity”, and “Make the hooks more provocative”. Responses should feel agentic and the UI should visibly update relevant workflow nodes/output. Use deterministic local/mock intelligence so no API key is required.
7. Add a Run Workflow action. Show convincing execution progress per node, then a completion state with a campaign workspace.
8. Campaign workspace should present polished outputs: campaign strategy, audience profile, 3 creative concepts, hooks, CTAs, visual direction, image-generation prompts, short-form video shot list, brand guardrails, QA checklist. Add a comparison/variation view where concepts can be compared.
9. Include demo/share mode that makes the experience easy to present.

PRODUCT THINKING:
Add a discreet but excellent “Why this exists” section explaining the insight above. Add “Product Thinking” with assumptions, next experiments, and metrics: time-to-first-concept, workflow completion rate, regeneration rate, export rate, and user edits per workflow. This should feel like evidence of product sense, not an academic essay.

SUBMISSION PAGE:
Create an About / Submission page stating clearly that this is an independent prototype created for a HexCoded product-role application and is not affiliated with HexCoded. Explain the problem, insight, what was built, and what I would explore next. Include links/areas for live demo and repository placeholders that are easy to replace later.

VISUAL/UX BAR:
Extremely premium AI-native creative software. Dark interface, sophisticated neutral palette, subtle gradients, restrained glass/blur, excellent typography, generous spacing, crisp cards, subtle borders, high-quality icons, smooth micro-interactions, polished transitions, keyboard-friendly controls, responsive layout. Avoid generic purple AI-dashboard styling. Establish a strong Creative OS visual identity and logo treatment. Include a small “Independent prototype for HexCoded” badge, never implying official affiliation. Use a cinematic but functional feel inspired by serious creative tools and modern developer products.

FUNCTIONALITY/BREADTH:
Implement meaningful loading, empty, success, error and hover/focus states. Include toast feedback where useful. Make buttons and controls work. Provide realistic mock data and deterministic state transitions. No external API keys should be required. Structure the application cleanly so an AI provider can be swapped in later. Prioritize the demo path over unnecessary backend complexity.

IMPORTANT: Make the result feel like a real shipped product, not a hackathon prototype. Spend effort on hierarchy, interaction quality, visual polish, and the first 60 seconds of the demo. The recruiter should immediately understand what is novel and why it matters.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://creative-flow-director.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d9f4cf9e-cf9d-454b-b1e2-9ba5a4fc782e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
