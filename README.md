# Arrive SG

A step-by-step checklist for students moving to St.Gallen to study at HSG. Students answer a few questions and get the steps that apply to them, in order. Everyone says whether they come for a Bachelor's, a Master's, or a PhD or other degree (international students can also choose an exchange). International students then say where they move from and whether they plan to work; Swiss students say where their main residence will be and whether they are liable for military service. Each step shows the deadline, the documents, the office and a link to the official City of St.Gallen, Canton of St.Gallen or HSG page it is based on.

It is a frontend-only prototype for Demo Day, built with Next.js and React. There is no backend: answers and ticked-off steps stay in the student's browser.

## Run it

You only need Docker with the Compose plugin, and `make`.

```sh
make provision     # build and start; the app runs on http://localhost:3000
make deprovision   # stop it
make               # list all targets
```

If port 3000 is taken: `make provision APP_PORT=9000`.

To work on the app with live reload:

```sh
make dev           # Next.js dev server in Docker on http://localhost:3001
make test          # checks every step cites an official source
```

Or without Docker (needs Node 20.9+): `cd frontend && npm install && npm run dev`, and `npm test`.

## Deploy for the demo

Every push to `main` builds the app and publishes it to GitHub Pages ([.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)). One-time setup: in the repository settings, go to **Pages** and set **Source** to **GitHub Actions**. The app is then at `https://<user>.github.io/start-group-4/`.

`npm run build` writes plain static files to `frontend/out/`, so the app also works on Netlify, Vercel or any web server.

## Where the rules come from

- [docs/context_1.md](docs/context_1.md): the rulebook for international students, extracted from the official pages.
- [docs/rulebook-eu-efta-students-stgallen.md](docs/rulebook-eu-efta-students-stgallen.md): the rulebook for EU/EFTA students. Its rows for everyone (housing, everyday life, help) apply to all students.
- [docs/Studying at HSG as a UK citizen — Step-by-step admin guide.md](<docs/Studying at HSG as a UK citizen — Step-by-step admin guide.md>): the step-by-step guide for UK students.
- [docs/rulebook-swiss-students-stgallen.md](docs/rulebook-swiss-students-stgallen.md): the rulebook for Swiss students.
- [frontend/src/data/steps.js](frontend/src/data/steps.js): the checklist steps, each with the rulebook rows it covers, its source (with the verbatim quote where the rulebook gives one, kept in the data for checking; the app shows only the link).
- [frontend/src/data/sources.js](frontend/src/data/sources.js): the source pages (S1–S8 for international students, EU-S… for EU/EFTA students, UK-… for UK students, CH-S1 to CH-S9 for Swiss students), with links to their English versions where they exist.

When a rule changes, update the quote and the step together. If a source doesn't say something, leave the gap open (it is recorded in the step's `missing` list, which the app does not show) instead of filling it.
