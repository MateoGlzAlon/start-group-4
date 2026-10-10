# Arrive SG

A step-by-step checklist for international students moving to St.Gallen. Students answer a few questions (nationality, degree or exchange, where they move from and to, work, health insurance) and get the steps that apply to them, in order. Each step shows the deadline, the documents, the office and the exact sentence from the official City of St.Gallen, Canton of St.Gallen or HSG page it is based on.

It is a frontend-only prototype for Demo Day. There is no backend: answers and ticked-off steps stay in the student's browser.

## Run it

You only need Docker with the Compose plugin, and `make`.

```sh
make provision     # build and start; the app runs on http://localhost:8095
make deprovision   # stop it
make               # list all targets
```

If port 8095 is taken: `make provision APP_PORT=9000`.

To work on the app with live reload (needs Node 20+):

```sh
cd frontend
npm install
npm run dev        # http://localhost:5173
npm test           # checks every step cites an official source
```

## Deploy for the demo

Every push to `main` builds the app and publishes it to GitHub Pages ([.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)). One-time setup: in the repository settings, go to **Pages** and set **Source** to **GitHub Actions**. The app is then at `https://<user>.github.io/start-group-4/`.

The build in `frontend/dist/` is plain static files, so it also works on Netlify, Vercel or any web server.

## Where the rules come from

- [docs/context_1.md](docs/context_1.md): the rulebook extracted from the official pages.
- [frontend/src/data/steps.js](frontend/src/data/steps.js): the checklist steps, each with its verbatim source quote and an English translation.
- [frontend/src/data/sources.js](frontend/src/data/sources.js): the source pages (S1–S10) and the date they were checked.

When a rule changes, update the quote and the step together. If a source doesn't say something, the step lists it under "Not in the official sources" instead of filling the gap.
