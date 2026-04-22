# Bloomberg-Sentry-IBM Research Design System

## Purpose

This project uses a Bloomberg-first research interface with Sentry-style diagnostic density and IBM Carbon-style enterprise structure. The goal is not a marketing site. The goal is an institutional briefing surface for working papers, figures, policy implications, and teaching material.

Use this file before making PPT companion UI, paper pages, curriculum pages, interactive "prezi" pages, or PowerPoint templates.

Ambition: this site should set the standard for academic and research websites. It must serve academics, lawyers, regulators, executives, journalists, students, and ordinary affected people in 190 countries, including non-US and non-English readers such as fishermen in Indonesia. Rigor and accessibility are both requirements. The site must care about the little guy, not only institutions.

## Design Position

Primary reference: Bloomberg terminal / Bloomberg editorial research.

Secondary reference: Sentry via getdesign.md for dark, data-dense dashboard structure.

Tertiary reference: IBM Carbon via getdesign.md for enterprise/government/regulator credibility, accessibility, structured grids, and restrained blue accents.

Mistral is only a minor accent source for sharp geometry and occasional declarative section markers. Do not copy Mistral's full warm ivory/orange brand system. It is too consumer-marketing and too warm for this corpus. Keep the page dark, data-dense, precise, and institutional.

## getdesign.md Reference Policy

getdesign.md should be treated as a world-class design-language library, not as a one-time choice. Before major UI or deck work, choose the best reference set for the job:

- Research dashboards and paper-status pages: Bloomberg + Sentry + IBM.
- Formal paper pages and source packages: Bloomberg + IBM + Resend.
- Long-form editorial essays or public explainers: Bloomberg + WIRED + IBM.
- Animated web/prezi lessons: Bloomberg + Sentry + selective Mistral or Runway.
- Enterprise/software buyer pages: IBM + Sentry + restrained Bloomberg.
- Dense rank-order directories: Bloomberg + Linear + Sentry.

Do not mechanically copy any one brand. Extract the useful design grammar: density, typography, layout, iconography, motion, evidence hierarchy, and interaction patterns.

Candidate references should be ranked against the task using:

- credibility for academics/regulators/executives;
- ability to carry dense data without visual collapse;
- compatibility with dark Bloomberg theme;
- support for figures, tables, charts, and source packages;
- risk of looking like generic AI-generated marketing;
- exportability to PowerPoint master layouts.

## Visual Atmosphere

- Dark research terminal, not SaaS landing page.
- Dense but legible dashboards, not decorative cards.
- Figures are first-class evidence objects.
- Tables should feel like financial terminals: compact rows, clear hierarchy, strong sorting/filter affordances.
- Animation should clarify theorem logic, evidence flow, or publication navigation. It should not decorate.
- The user should feel they are entering a serious research program with publication discipline, not an AI-generated content farm.
- A non-specialist should still know where to start, what the paper claims, why it matters, and what decision-maker could act on it.
- An ordinary affected person should be able to answer: what does this mean for me, what warning signs matter, what evidence should I preserve, who might help locally, and what action path is realistic in my country.

## Core Palette

- Background: `#0D0D0D`
- Surface: `#1A1A1A`
- Elevated surface: `#111111`
- Primary text: `#F5F0E8`
- Secondary text: `#C8C8C8`
- Muted text: `#8A8A8A`
- Bloomberg amber: `#F59E0B`
- Mistral flame accent: `#FA520F`
- System green: `#22C55E`
- Risk red: `#EF4444`
- Data cyan: `#22D3EE`
- Regulatory blue: `#60A5FA`
- Purple only as a minor category accent: `#A78BFA`

## Typography

- Serif headings: `Newsreader`, Georgia, serif.
- Mono labels, ranks, data, table headers: `JetBrains Mono`, ui-monospace, monospace.
- Body: Newsreader or system sans only where the existing page already uses it.
- Do not use negative letter spacing.
- Do not scale font size directly with viewport width.
- Use uppercase for short mono section markers only.
- Use large type only for true page heroes or chapter openers.

## Layout

- Page sections are full-width bands or unframed constrained layouts.
- Do not put cards inside cards.
- Use cards only for repeated paper entries, figure objects, accordions, or modal/detail panels.
- Default radius is 4px.
- Keep fixed-format tools stable with explicit dimensions, aspect ratios, or grid constraints.
- Mobile must stack without horizontal overflow.

## Paper Page Model

Each paper page should become an interactive briefing room:

- Plain-language starting point for non-specialists.
- Scholar-grade abstract and contribution statement.
- Lawyer/regulator section: authority, legal hook, rule change, evidence record, enforcement path.
- Affected-community section where relevant: what the domain means in practice, in ordinary language.
- Little-guy action section where relevant: warning signs, evidence to preserve, who to contact, what not to do, and realistic local path.
- Rank, category, publication wave, SSRN status, and web page link.
- Executive abstract.
- Accordion sections for contribution, theorem handle, data, methods, policy implications, source package, limitations, and next revision tasks.
- All major figures, tables, graphs, and McKinsey-quality diagrams.
- A PowerPoint deck link when generated.
- An audiocast/podcast link when generated, optimized for mobile listening.
- Optional GSAP/Three.js explainer where animation teaches the theorem or DA mechanism.
- Keep "scholar shorthand" in internal tables only; public paper titles must be formal titles.

## PowerPoint / Prezi Model

Target deck shape per major paper:

- Around 200 slides for full teaching decks.
- Around 30 top-quality figures, tables, or charts from the working paper.
- Bloomberg-Sentry-IBM theme: dark terminal surfaces, diagnostic dashboards, amber section markers, IBM-grade grid discipline, precise mono labels, selective blue/risk accents.
- Decks should be exportable PowerPoint files, not only web animations.
- GSAP belongs on the web/prezi version. PowerPoint files should use native slide structure and restrained transitions.
- Every deck needs a repeatable master: title, executive summary, theorem, evidence, figure, table, policy, limitations, source package, and appendix layouts.

Educational product benchmark:

- Khan Academy for conceptual clarity and step-by-step explanation.
- Coursera for modular course structure, learning objectives, checks for understanding, and durable sequence.
- MasterClass for pacing, polish, confidence, and production value.
- McKinsey/Bain/BCG for figure quality, executive synthesis, and slide-level takeaway discipline.
- Bloomberg/Sentry/IBM for the visual system: dark research density, diagnostic dashboards, structured enterprise credibility.

The goal is to beat ordinary academic lecture decks. Each slide or web-deck frame needs a job: teach one idea, prove one claim, interpret one figure, or move the reader to the next action. Do not create filler slides.

Deck/web-course structure:

1. Cold open: why the domain matters to an ordinary affected person and a decision-maker.
2. Learning objectives.
3. Plain-language model.
4. Formal theorem/mechanism.
5. Evidence sequence.
6. Figure/table walkthroughs.
7. Six-agent action map.
8. Jurisdiction/global layer.
9. Decision Accounting / Field 16 repair.
10. Limitations and falsification.
11. What to read/listen/watch next.

Web-deck enhancements:

- GSAP for reveal sequences, figure annotations, sorting/filter transitions, and theorem flow.
- Three.js only for genuinely multidimensional concepts.
- Lightweight comprehension checks where useful.
- Audiocast and transcript linked from the same module.

## Research-To-Action Learning Platform Benchmark

The site should absorb best practices from leading education and executive-communication platforms without becoming a copy of any one of them.

Core synthesis:

- Khan Academy: mastery learning, plain-language explanation, step-by-step scaffolding, and checks for understanding.
- Coursera: backward design, learning objectives, module sequencing, readings, assignments, and durable course structure.
- MasterClass: production polish, short lessons, guides/resources, mobile access, audio-only consumption, bookmarks, and notes.
- McKinsey/Bain/BCG: one message per figure/slide, executive synthesis, clear chart titles, source notes, and decision relevance.
- Bloomberg/Sentry/IBM: dark research terminal, diagnostic dashboard density, and enterprise/regulator credibility.

What this site can do better:

- Connect research directly to six-agent action paths.
- Provide 190-country pathways where sourceable.
- Serve both experts and ordinary affected people.
- Put paper, summary, figure library, source package, deck, audiocast, transcript, and PolicyLab in one place.

Every paper page should eventually expose:

`Summary` · `Web Deck` · `PowerPoint` · `Audiocast` · `Transcript` · `Figures` · `Source Package` · `Six-Agent PolicyLab` · `190-Country Local Path` · `SSRN`

Production protocol:

1. Build the structured paper brief.
2. Make the plain-language summary.
3. Make the figure/table library.
4. Make the web deck with GSAP/Three.js where useful.
5. Export the `.pptx`.
6. Attach audiocast and transcript.
7. Add six-agent PolicyLab.
8. Add 190-country pathway where sourceable.
9. Freeze English.
10. Translate.

## Audiocast Model

Every paper should eventually have a mobile-listenable audiocast/podcast artifact.

- Treat the audiocast as a publication artifact equal to the summary page and deck.
- The paper page should expose the audiocast link/status.
- Script from the paper brief, not from generic LLM memory.
- Cover the hook, theorem/mechanism, evidence, key figures, policy implications, limitations, and what to read next.
- Use the same Bloomberg-Sentry-IBM information hierarchy in the companion page around the audio player: title, runtime, paper rank, source status, transcript, and related deck.
- Current observed production rate from user Gemini run: about 21 hours for roughly 70 audiocasts. Use this as an operational baseline, not a quality guarantee.

## Animation Rules

- Use GSAP for scroll-linked teaching sequences, theorem flows, paper-directory filtering, and figure narration.
- Use Three.js for genuinely multidimensional concepts such as the missing system-welfare axis.
- Do not animate routine text just to make the page feel busy.
- Respect reduced-motion settings.
- Verify animations by screenshot and canvas-pixel checks on desktop and mobile.

## Good Secondary Borrowings

### Sentry

- Dense diagnostic dashboard composition.
- Clear incident/event hierarchy.
- Dark surfaces with sharp data contrast.
- Practical developer-tool affordances that can map to paper QC, figure status, source status, and publication readiness.

### IBM Carbon

- Structured enterprise grids.
- Accessibility and durable component patterns.
- Restrained blue accents for regulator/public-policy material.
- Government/enterprise credibility.

### Mistral

- Sharp architectural geometry.
- Confident section markers.
- Warm accent blocks for moments of emphasis.
- Large declarative slides when a theorem or policy result deserves one.

## Mistral Elements To Avoid

- Full warm ivory/orange page canvas.
- Aggressive poster typography everywhere.
- Golden-hour shadows.
- Pure marketing hero patterns.
- Decorative landscape imagery.

## Figure Standard

Figures must be treated as publishable evidence, not screenshots dropped into a page.

- Clear title and takeaway.
- Source or method note.
- Consistent axis treatment.
- High contrast on dark backgrounds.
- No cramped labels.
- No unexplained abbreviations.
- Figure should pass the Five-Minute Test: an unknown reader can reconstruct what it means without asking the author.

## Accessibility And Global Reader Standard

- Every page needs a clear "Start here" path.
- Every technical section should have a plain-language equivalent nearby.
- Spell out abbreviations on first use.
- Do not assume US regulatory knowledge.
- When a paper has global consequences, include 190-country jurisdiction and affected-community framing.
- Avoid insider-only academic shorthand in public headings.
- Mobile reading and audio listening are first-class, not afterthoughts.
- Translations/localizations must preserve meaning, not merely word substitution.
- The little-guy path is not optional. It must be available wherever the domain has ordinary victims, workers, patients, consumers, borrowers, farmers, fishermen, families, or small investors.

## Localization Workflow

The app has a 22-language selector. Do not translate the full site while the English canonical content is still moving. First stabilize the English paper pages, decks, PolicyLab, curriculum, and summaries. Then translate from canonical structured content.

Translation order:

1. Freeze canonical English copy for a page or paper artifact.
2. Generate translations from the structured paper brief, not scattered UI strings.
3. Preserve theorem handles, statute names, source titles, and regulator names unless a standard local-language equivalent exists.
4. Check right-to-left layout for Arabic.
5. Verify mobile readability for every language group.
6. Treat Indonesian, Malay, Swahili, Bengali, Hindi, Thai, Vietnamese, Arabic, Chinese, Spanish, French, Portuguese, and English as high-priority global accessibility languages.

## PolicyLab Standard

PolicyLab must be updated for the current theorem and Decision Accounting innovations before localization.

Required model:

- 59 SAPM market-failure domains plus 2 controls, with foundational/regulatory bridge concepts where relevant.
- 190-country orientation where country-level pathways are available or can be source-verified.
- Six-agent action model, not regulator-only:
  - Whistleblower: what evidence to collect, how to frame the system-welfare failure, and what protection/reporting channel applies.
  - Plaintiff: legal theory, standing, damages theory, discovery target, and Field 16 evidence gap.
  - Regulator: authority, rulemaking/enforcement instrument, supervisory evidence, and failed-disclosure risk.
  - Legislator: statute or amendment that changes the rule set.
  - Investor: portfolio risk, engagement demand, disclosure insufficiency, and governance repair.
  - Supranational: treaty, standard-setter, multilateral institution, cross-border coordination, and enforcement gap.
- Regulator/authority map by country/jurisdiction as one agent lane within the six-agent model.
- Policy instrument and rule change `R`: what actually transforms game `G` into `G'`.
- PPT Theorem 1: local/private bilateral success does not certify system welfare.
- PPT Theorem 4B: disclosure inside the same game may not change equilibrium.
- Game-Change Theorem 1: institutional traps require rule changes.
- Accountability Reconstruction: process-sensitive liability regimes need contemporaneous reconstruction-complete decision records to distinguish good-faith failure from negligent failure after bad outcomes.
- Decision Accounting Field 16: system welfare record.
- Five-Minute Test: can an unknown reader reconstruct the decision and welfare claim?
- Failed-disclosure warning: what happens if the regulator only mandates more information.
- Affected-community explanation in ordinary language.
- Little-guy pathway: what this means for ordinary affected people, warning signs, evidence to preserve, who to contact, and realistic local-country path.
- Agent-specific action: what the six agents should do, including what FCC, FTC, CFTC, SEC, EPA, FDA, EU Commission, UK FCA/PRA, MAS, HKMA/SFC, ASIC/APRA, and other authorities should actually do in the regulator lane.

## GSAP Motion System

### Installation
- `gsap` and `@gsap/react` are installed as runtime dependencies.
- ScrollTrigger is registered in `src/lib/motion.js`.

### Reusable Hooks (`src/lib/motion.js`)
- `useFadeIn(options)` — fade single element on mount.
- `useSlideUp(options)` — slide single element up on mount.
- `useStaggerReveal(selector, options)` — stagger children on mount.
- `useScrollTriggerEntrance(options)` — fade + slide up when entering viewport.
- `useScrollStagger(selector, options)` — stagger children on scroll entrance.
- `useMotionValue(target, options)` — animate numeric values.

### Reduced Motion
All hooks check `window.matchMedia("(prefers-reduced-motion: reduce)")` before animating.
If reduced motion is preferred, elements render at full opacity with no transforms.

### Routes Using Motion
- `/impossibility` — `ImpossibilityTheorems.jsx`
  - `TheoremProofFlow`: animated 3-step proof architecture (axioms → proof → impossibility)
  - `CanonTimeline`: scroll-triggered stagger reveal of historical theorem rows
  - `PPTCard` and `TheoremCard`: scroll-triggered fade-in/slide-up entrances

### Rules
1. Motion must teach theorem logic, evidence flow, or hierarchy.
2. No decorative orbs, globes, or random animations.
3. All animations respect `prefers-reduced-motion`.
4. ScrollTrigger uses `start: "top 85%"` and `toggleActions: "play none none none"` to fire once.
