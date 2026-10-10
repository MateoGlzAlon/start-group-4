# Project context

We are building a tool that gives international students at HSG (University of St. Gallen) step-by-step relocation guides tailored to their profile.

## Problem definition

**Who:** Students, both before and after they move to St. Gallen (newcomers).

**Problem:**
- Information is spread across many government websites.
- It is in a language some of them do not understand.
- It is not adapted to their profile.

**Current situation:** Students cope with confusion, inefficiency and unnecessary work, which costs them time and nerves.

## Value proposition

| | |
|---|---|
| **Customer** | HSG |
| **Problem we solve** | Unnecessary bureaucracy |
| **Solution** | Detailed step-by-step guides adapted to each student's profile |
| **Alternatives** | Government websites; emails and queries to the admissions office |
| **Why we're better** | HSG employees can spend their time on more important tasks |

**In one sentence:** For HSG, we cut unnecessary bureaucracy with detailed step-by-step guides adapted to each student's profile. This beats government websites and admissions office emails because it frees HSG employees to spend their time on more important tasks.

## Reference documents

- [docs/context_1.md](docs/context_1.md): the rulebook for moving to St. Gallen, extracted from the official City of St. Gallen, Canton of St. Gallen and HSG pages. For each profile (EU/EFTA, UK, other countries, everyone) it lists what students must do, which documents they need, the deadline, the office and the exact source sentence. It ends with a link check and a list of what is still missing for a complete checklist. Use it as the source of truth for the rules the guide shows. Where it says "not in source", do not fill the gap from general knowledge.
- [docs/rulebook-swiss-students-stgallen.md](docs/rulebook-swiss-students-stgallen.md): the same kind of rulebook for Swiss students moving to St. Gallen, built from official City of St. Gallen, Canton of St. Gallen, ch.ch and HSG pages. It covers three profiles (Swiss with main residence in St. Gallen, Swiss weekly residents, service-liable Swiss men) and four topics: registration with the city, health insurance, military/civil service and the exemption tax, and integration resources. Each row quotes the source sentence in its original language. It ends with a list of what is still missing for a complete checklist. Use it as the source of truth for Swiss students, with the same "not in source" rule as above.
- [docs/rulebook-eu-efta-students-stgallen.md](docs/rulebook-eu-efta-students-stgallen.md): the rulebook for EU/EFTA students (version 3, 10 Oct 2026), built from official city, canton, federal and HSG pages and Serafe. Its rows A1–M13 cover arrival, registration, permits, health insurance and the EHIC exemption, work, leaving, country-specific rules (Liechtenstein, Croatia, DE/FR/IT/AT), admission, money, everyday life, and health and help. Section N is a chronological checklist that maps steps to rows. Use it as the source of truth for EU/EFTA students, with the same "not in source" rule. Its rows whose "Who" is "Everyone" or "All students" (housing, rent, Serafe, AHV amounts, help) apply to every profile.
- [docs/Studying at HSG as a UK citizen — Step-by-step admin guide.md](<docs/Studying at HSG as a UK citizen — Step-by-step admin guide.md>): a step-by-step guide for UK citizens doing a degree at HSG, in 20 numbered steps, with a document checklist and seven open points. UK citizens count as non-EU/EFTA: the permit must be granted before entry. It fills the gap docs/context_1.md leaves for UK degree students. It links its sources but does not quote them. Use it as the source of truth for UK students only, even where it cites a general page.
- [docs/style.md](docs/style.md): the look of the HSG website (colours, type, spacing, components), read from its CSS. The app follows it.

## The app

`frontend/` is a frontend-only prototype for the demo, built with **Next.js (App Router) and React, in plain JavaScript**. There is no backend.

- **Static export.** `next.config.mjs` sets `output: "export"`, so `npm run build` writes plain files to `frontend/out/`, which any web server can host. Do not add API routes, server actions or anything else that needs a Node server at runtime.
- **Pages:**
  - `/` shows the intro, then one question per screen. Everyone answers nationality, then programme (Bachelor's, Master's, PhD or other degree; exchange is offered to international students only, since no rulebook covers Swiss exchange students). International students then answer where they move from, and work. `isDegree` covers the three degree answers; steps that differ by level use `isBachelor` and `isMaster`. The value `degree` (PhD or other) is kept so old checklist links still open. Swiss students answer main residence and military service instead. Steps that aren't about permits or nationality (applying, budget, housing, everyday rules, …) are shared by everyone; tailor them with `when` items (for example Swiss vs foreign tuition) rather than writing a Swiss copy.
  - `/guide/?nationality=…&…` is the checklist, grouped into phases ("Before you arrive", "Your first 14 days", …).
  - The answers live in the URL. Ticked-off steps live in the browser's `localStorage` (see `src/lib/storage.js`).
- **Code layout:** pages in `src/app/`, client components in `src/components/`, each with a CSS Module next to it. Design tokens and base styles are in `src/app/globals.css`. Do not add a CSS framework or UI library.
- **Data** in `src/data/`:
  - `profile.js`: the questions (a question with `ask` is shown only for some answers) and the helpers that say which rulebook group a student belongs to (`isSwiss`, `isEu`, `isUk`, `isOtherCountry`, `inExchangeUkGroup`, `liableForService`, …). The groups differ by rule: the HSG exchange guide puts Australia, Japan, Malaysia, New Zealand and Singapore with the UK, while the permit rules have EU/EFTA, UK and "other countries".
  - `steps.js`: the checklist. Each step has:
    - `when(profile)`: which profiles see the step;
    - the rows it covers: `rows` for docs/context_1.md (1–30), `chRows` for the Swiss rulebook (A1–C21), `euRows` for the EU/EFTA rulebook (A1–M13) and `ukSteps` for the numbered steps of the UK guide (1–20);
    - `sources`: each gives the place on the page (`where`), the exact `quote` where the rulebook quotes a sentence, or both. German quotes also get an English `translation`;
      The app shows only a link to each source page, never the quotes or translations. They stay in the data so the team can check each rule.
    - `missing`: what the sources don't say. It is a record for the team and is **not shown** in the app; do not add a "Not in the official sources" panel back.

    The Swiss rulebook's "Everyone" rows also apply to international students (the CHF 200 fine for late registration, "Tell others your new address"). Its appendix row I11 adds the city's exemption form to the international health-insurance step.

    The EU/EFTA rulebook's rows apply to the group in their "Who" column. Rows for EU/EFTA citizens show only to them. Rows for "Everyone", "All students", "Exchange students" or "Degree students" show to every profile in that group, Swiss students included where the row fits them (housing, Serafe, AHV, help). Information that isn't a task (renting rules, everyday rules, driving, bank account, help, student life, stays under 90 days) goes in optional steps in "Only if you need it". The EU rulebook's section G (integration links, no rows) is not shown.

    The UK guide's content shows only to UK students (`isUk`), as `{ text, when }` items or UK-only steps. UK degree students get `permit-uk-degree` instead of `permit-before-entry`.
  - `links.js`: forms, online services and office addresses that steps show under "Forms and links" and "Where". Each office address opens Google Maps.
    - Take every URL and address from a link or contact box on one of the official source pages, and check that it loads. Don't add links found elsewhere.
    - In step text, `Linkify` turns e-mail addresses, Swiss phone numbers and `.ch` web addresses into tap-to-write, tap-to-call and tap-to-open links.
  - `sources.js`: the official pages, with English versions where they exist.
    - S1–S8 come from docs/context_1.md.
    - CH-S1 and CH-S3 to CH-S9 are S1 and S3 to S9 of the Swiss rulebook. Its S2 is the same page as S1, so steps cite S1. CH-KV is the city page cited for row I11.
    - EU-S… are the EU/EFTA rulebook's sources, with its numbers. Pages already listed keep their ID: its S2 = S1, S3 = CH-S3, S4 = CH-KV, S6 = S2, S7 = S3, S10 = S6, S11 = S4, S49 = S7 and S51 = CH-S1. EU-SHSG is the Student Union page its row H7 links.
    - UK-… are the UK guide's pages that aren't listed elsewhere (`UK-MERKBLATT`, `UK-VISA`, `UK-FOPH`, `UK-SEMESTER`). Its other links point to S1, S2, S4–S8, EU-S12 and EU-S38.
    - S4, the HSG exchange PDF from January 2026, was offline when checked on 10.10.2026. HSG now links a "Visa and Entry Fact Sheet" (August 2026), This is recorded as a `notice` on S4 in `sources.js`, for the team only; the app does not show notices. The exchange steps follow docs/context_1.md until the rulebook is updated.
- **Rules for steps:**
  - Take every rule from docs/context_1.md (international students), docs/rulebook-eu-efta-students-stgallen.md (EU/EFTA students, and its rows for everyone), the UK guide (UK students) or docs/rulebook-swiss-students-stgallen.md (Swiss students).
  - When the rulebook says "not in source", add the gap to the step's `missing` list. Do not fill it from general knowledge.
  - Quote only sentences that the rulebook quotes. For everything else, cite the section with `where`. The UK guide quotes nothing, so its steps cite with `where` only.
  - When sources contradict each other, show both in the step and list the conflict under `missing`. Do not pick one. Because the app doesn't show `missing`, put the conflict in a visible field too, usually `notes`. Examples: the Swiss military address report, the EU/EFTA L-permit fee (CHF 71 at HSG, at most CHF 65 federally), and when to extend an EU/EFTA permit.
- **Tests:** `npm test` uses Node's built-in test runner on `frontend/test/`. It fails in four cases:
  - a step has no source, or cites one that isn't in `sources.js`;
  - a German quote has no translation;
  - a row of any rulebook, or a numbered step of the UK guide, is not covered by any step;
  - some profile ends up with an empty phase.

  The Docker build runs the tests too, so a broken step stops `make build`.
- **Look:** follow docs/style.md and use the tokens in `globals.css`.
  - Square corners, no shadows.
  - Light Gill Sans headings and Palatino body text.
  - HSG green only for actions, links and progress.
  - Each step is shown as an HSG event card: a grey card, a green block with the step number, and a green arrow square.
  - Don't use the HSG logo or present the app as an official HSG page. The header says "Student prototype" and the footer says it isn't an official service.
- **Phone first.** Most students will use the app on a phone. Design and check every change at 390 px and 320 px wide first, then on desktop.
  - On phones, body text stays at 16 px and anything you tap is at least 48 px tall. This deliberately differs from docs/style.md, where the HSG site drops to 14 px.
  - Below 600 px, a collapsed step card shows only its deadline and title. The summary appears when the card is open.
  - Below 840 px, "Mark as done" is in the dock instead of the card. The dock is a bar fixed to the bottom of the screen, shown only while the open step is on screen. Opening a step scrolls it to the top of the screen.
  - Pad fixed and edge-to-edge elements for the iPhone safe areas (`env(safe-area-inset-*)`).
  - Put hover effects inside `@media (hover: hover)`, because on touch screens they stick after a tap. Give touch feedback with `:active` instead.
  - In CSS Modules, wrap global classes (`.btn`, `.meta`, `.btn-link`) in `:global()`. Never reuse a class name for two different things in one module.
- **Deploy:** [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) publishes the app to GitHub Pages on every push to `main`. It builds with `BASE_PATH=/<repository name>`. Link between pages with `next/link` or `useRouter`, which add the base path. Never hard-code internal URLs in an `<a>`.

## Everything runs in Docker

- Every part of the system (frontend, backend, database and any other service) runs in a Docker container. The only things needed on the host are Docker with the Compose plugin, and `make`.
- Each service has its own `Dockerfile`. A Docker Compose file at the repository root ties all services together.
- When you add a service, add its `Dockerfile`, its Compose entry and its Makefile entry in the same change.

## A Makefile sets up and tears down the system

The root `Makefile` is the single entry point for running the system. It follows the layout of the Makefile in our `pitas-hs26-group2` project:

- Running `make` with no target prints the help (`.DEFAULT_GOAL := help`). Every target has a `## description` comment on its line, and `help` lists the targets by grepping for that comment.
- Variables at the top: `SERVICES` lists the services, so adding a service there is enough for every target to pick it up. `COMPOSE` holds the `docker compose -f …` command.
- Targets are grouped under `## --- Section ---` comment headers, and all of them are declared in `.PHONY`.

It has at least these targets:

| Target | What it does |
|---|---|
| `help` | List all targets with their descriptions |
| `check` | Verify the prerequisites (Docker, the Compose plugin) are installed, with a clear message for each missing one |
| `build` | Build the Docker image of every service |
| `provision` | Start the whole system in Docker, detached (`docker compose up -d`) |
| `deprovision` | Stop the system and remove its containers, volumes and orphans (`docker compose down -v --remove-orphans`) |

It also has `status`, `logs`, `test` (runs the frontend tests in Docker) and `dev` (Next.js with live reload on port 3001, in Docker). The app itself (`make provision`) runs on http://localhost:3000.

As the system grows, add more targets (tests, logs, …) under their own section. When a target is added or changed, update its `##` description in the same change.
