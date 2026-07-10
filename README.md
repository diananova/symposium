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
- **In-app reading**: all twelve Year-1 Plato dialogues are fully readable
  in the app in Jowett's public-domain translations, split into the
  tracker's sections with source attribution
- **Text vs. interpretation**: each edition's introduction is extracted too,
  but kept strictly separate — commentary appears under the book marked
  "Interpretation · not the text" and opens behind a banner saying so.
  These commentary files will also feed Phase 3's question drafting.

Upcoming: Phase 2 (pre-reading context panels), Phase 3 (tutorial question
loop with post-answer commentary — "Contributions" and "The Company Speaks").

## Architecture

- React + TypeScript + Vite, mobile-first responsive web (wider layouts at
  ≥720px; reading measure stays book-like).
- **Deliberately no server.** The app is static curriculum content plus one
  user's progress; a backend would add cost and an availability dependency
  for no benefit. The separation lives at the right seams instead:
  - *Content* is static JSON under `public/texts/` — effectively the
    read-only API, produced by the pipeline below.
  - *Progress* sits behind the `ProgressStore` interface in
    [src/lib/progressStore.ts](src/lib/progressStore.ts); v1 implements it
    with `localStorage` (`symposium.progress.v1`, JSON-exportable). A synced
    backend (Firestore, API) later means implementing that one interface.
- **Routing**: hash-based URLs for every view (`#/book/plato-apology/read/apology-3`)
  — deep-linkable, back-button friendly, and deployable to any static host
  with no rewrite rules.
- **PWA**: installable, with the app shell, self-hosted fonts, and *all*
  curriculum texts precached — the entire library reads offline after the
  first visit.
- **Quality gates**: vitest unit tests (storage contract + curriculum
  invariants: unique ids, text files present, reading order) and a GitHub
  Actions CI running lint, tests, and build on every push.

## Content pipeline

Adding a work is a documented, repeatable recipe — see
[.claude/skills/add-book/SKILL.md](.claude/skills/add-book/SKILL.md)
(inspect the source with `scripts/inspect-source.mjs`, verify section
anchors, add a config entry, run the build).

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
