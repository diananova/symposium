# Symposium

*Studia Humanitatis* — a personal Great Books learning app inspired by the
St. John's College curriculum and tutorial method.

The core loop (built out across phases): **read → answer open-ended questions
in your own words → then hear from others** ("The Company Speaks").

## Status: Phase 1 — Curriculum Tracker

- Year → Track → Book → Section curriculum model (Years 2–4 and non-Seminar
  tracks visible but locked, as a roadmap)
- Seeded with Plato's *Apology* (7 sections, Stephanus cites, estimated lengths)
- Per-section reading status (not started / in progress / complete) and
  free-text notes, autosaved locally
- Progress rendered as the **kylix** ring motif (a symposium wine cup from
  above), overall and per section
- Progress export as JSON

Upcoming: Phase 2 (pre-reading context panels), Phase 3 (tutorial question
loop with post-answer commentary — "Contributions" and "The Company Speaks").

## Stack

- React + TypeScript + Vite, mobile-first responsive web
- No backend: single-user v1 persists to `localStorage`
  (`symposium.progress.v1`), JSON-exportable. Curriculum content is static
  data in [src/data/curriculum.ts](src/data/curriculum.ts).

## Develop

```sh
npm install
npm run dev     # local dev server
npm run build   # type-check + production build
```
