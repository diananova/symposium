# Symposium

*Studia Humanitatis* — a personal Great Books learning app inspired by the
St. John's College curriculum and tutorial method.

The core loop (built out across phases): **read → answer open-ended questions
in your own words → then hear from others** ("The Company Speaks").

## Status: Phase 1 — Curriculum Tracker

- Year → Track → Book → Section curriculum model
- Year 1 seeded with the actual St. John's College freshman reading list
  across its four tracks — Seminar, Language (Ancient Greek), Mathematics,
  Laboratory — with Plato's *Apology* divided into 7 sections (Stephanus
  cites, estimated lengths). Years 2–4 to follow.
- Per-section reading status (not started / in progress / complete) and
  free-text notes, autosaved locally
- Progress rendered as the **kylix** ring motif (a symposium wine cup from
  above), overall and per section
- Progress export as JSON
- **In-app reading** (pilot): Plato's *Apology* is fully readable in the app
  in Jowett's public-domain translation, split into the tracker's 7 sections
  with source attribution

Upcoming: Phase 2 (pre-reading context panels), Phase 3 (tutorial question
loop with post-answer commentary — "Contributions" and "The Company Speaks").

## Stack

- React + TypeScript + Vite, mobile-first responsive web
- No backend: single-user v1 persists to `localStorage`
  (`symposium.progress.v1`), JSON-exportable. Curriculum content is static
  data in [src/data/curriculum.ts](src/data/curriculum.ts).

## Content pipeline

Section texts are public-domain translations, fetched and split by
[scripts/build-texts.mjs](scripts/build-texts.mjs) into one JSON file per
section under `public/texts/<bookId>/<sectionId>.json` (each carries
translator, license, and source attribution). To add a work: find a
public-domain translation (Project Gutenberg, Wikisource, Perseus), verify
the paragraph anchors where each curriculum section begins, add a config
entry, and run:

```sh
node scripts/build-texts.mjs
```

Works without a clean public-domain English translation (e.g. Ptolemy's
*Almagest*) stay as tracked-only entries.

## Develop

```sh
npm install
npm run dev     # local dev server
npm run build   # type-check + production build
```
