# Build Prompt: Symposium (v1)

## Branding & Design Direction

**Name:** Symposium — after Plato's dialogue, where participants take turns
sharing and refining understanding through conversation. Maps directly onto
the app's core loop: read, think, then hear from others.

**Tagline:** "Studia Humanitatis" — the Renaissance humanists' term for the
core curriculum (grammar, rhetoric, poetry, history, moral philosophy)
recovered from antiquity. Should appear on the home/loading screen beneath
the wordmark, and can also appear as a small tagline elsewhere in the app.

**Naming conventions to use in-app:**
- The answer-log / journal of your own responses: "Contributions"
- The commentary reveal (shown after answering): "The Company Speaks"
- Progress indicator: styled as a "kylix" (the wine cup used at a symposium,
  viewed from above) — a concentric-ring progress motif, used both for
  overall progress and per-section progress

**Color palette:**
- Background (linen): #EFE8D8
- Background deep: #E5DCC7
- Card background: #F7F3E8
- Ink (primary text): #2B2620
- Ink soft (secondary text): #5C5347
- Wine (primary accent): #7A2E2E
- Wine deep (emphasis): #5E2222
- Olive (secondary accent, "complete" states): #6B7353
- Gold (highlight/borders): #B08D3E

**Typography:**
- Display/headings: Fraunces (serif, used with restraint for titles)
- Body/reading text: Source Serif 4
- Labels, metadata, buttons: IBM Plex Mono (uppercase, letter-spaced)

**Design tone:** Warm and quietly convivial rather than sterile-minimal or
corporate — closer to "a well-made book" than "an app." Generous whitespace,
serif-forward, restrained use of the wine/olive accents. Avoid generic
AI-design defaults (plain cream + terracotta, zero-radius broadsheet grids).

A working HTML mockup of the core screens (home/loading screen, curriculum
tracker, reading screen, post-answer commentary reveal) already exists — use
it as the visual reference for implementation.

## Context for Claude Code

I'm building a personal learning app inspired by St. John's College's curriculum and
tutorial teaching method (Great Books, close reading, Socratic-style discussion).
I'm the first and only user for now. Build this as a **mobile-friendly web app**
first; an iOS app may follow later, so keep the architecture portable
(plain web stack, avoid anything iOS/web-exclusive where possible).

## Core Philosophy (please respect this in design choices)

- The app's value is a **curated, sequenced curriculum** — not just a generic
  reading tracker or generic AI Q&A tool.
- The core learning loop is: **read → answer open-ended questions in my own words
  → THEN see context/commentary.** Never show commentary before I've answered.
- Keep "context" (historical/biographical facts, curriculum placement, edition notes)
  clearly separate from "commentary" (interpretation, scholarly takes) — context
  goes before reading, commentary after answering.
- This is a solo learning tool, not a simulated group seminar. Don't try to fake
  a "community discussion" — focus on making the solo tutorial loop excellent.

## Phase 1 (MVP): Curriculum Tracker

Build first, ship first, use daily before adding anything else.

**Data model** — reflect the real shape of a St. John's-style curriculum, even
though v1 only populates a small slice of it:

- **Year** (Freshman / Sophomore / Junior / Senior) — top-level grouping
- **Track** (Seminar, Language, Mathematics, Music, Laboratory) — within a
  year; v1 only builds out Seminar, but the model should allow other tracks
  to exist as locked/future entries
- **Book** — within a track, an ordered list (e.g., Freshman Seminar:
  Homer → Aeschylus → Herodotus → Plato → Aristotle...)
- **Section** — the individual reading chunks within a book, each with:
  - Title, sequence position
  - Status: not started / in progress / completed
  - Free-text notes field
  - Estimated length / recommended edition (optional metadata)

**UI structure:**
- Year selector at the top (tabs) — only Year 1 unlocked, others shown
  dimmed/locked as a visible roadmap
- Track chips within a year — only Seminar active, others shown locked
- Book list within the active track, sections within each book (this is the
  part built out first)
- Progress shown via the "kylix" ring motif (see branding section) at both
  the overall and per-section level

**Seed data:** Start with just ONE book, broken into sections (suggest: Plato's
*Apology* — public domain, short, foundational), inside Year 1 → Seminar.
Structure the data model so adding more books, tracks, or years later is
trivial (don't hardcode for one book only).

## Phase 2: Book & Section Context

For each book/section, add a "context" panel shown BEFORE reading:
- Author/historical context (2-4 sentences)
- Why this text sits here in the curriculum sequence (what it follows/leads to)
- Recommended translation/edition
- Rough length / what's structurally tricky about it (if relevant)

Keep this factual and orienting — explicitly NOT interpretive.

## Phase 3: Tutorial Question Loop

For each section, add:
- 2-4 open-ended "tutorial style" questions (Socratic, tied to a specific
  passage, not generic "what did you think")
- A text box for my own answer, saved and timestamped
- AFTER I submit an answer: reveal curated commentary/interpretation links
  (I will provide these — external links to translator notes, essays, etc.,
  not full reproduced text, for copyright reasons)
- On revisiting a section later, show my past answer(s) alongside a new
  answer field, so I can compare how my thinking changed over time

**Question generation:** I'll use Claude (or the Claude API) to help draft
candidate questions per section, then review/edit them myself before adding
to the app — don't auto-generate and auto-publish without my review step.

## Tech suggestions (adjust if you see a better fit)

- React frontend, mobile-first responsive design; no native-only APIs in v1
- Backend/database: Firebase (Firestore for data, Firebase Auth if/when
  needed later — not required for a single-user v1)
- Keep data model in a format that's easy to export/back up (JSON-friendly)

## What NOT to build yet

- No user accounts/multi-user support (I'm the only user)
- No AI chat interface embedded in-app yet — question generation happens
  externally (via me + Claude) and gets added as curated content
- No full St. John's curriculum — just one book, fully working end-to-end,
  before scaling to more

## First deliverable

A working Phase 1 tracker — branded as Symposium, following the design
direction above — with the *Apology* seeded as sample data under Year 1 →
Seminar (sections, progress tracking, notes), mobile-friendly, that I can
start using immediately.
