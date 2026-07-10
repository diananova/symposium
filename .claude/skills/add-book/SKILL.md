---
name: add-book
description: Add a work's public-domain text (and its edition's commentary) to Symposium's content pipeline so it becomes readable in-app. Use when asked to ingest, embed, or "add the text of" a curriculum book.
---

# Add a book to Symposium's content pipeline

Goal: make a curriculum work readable in-app by adding a config entry to
`scripts/build-texts.mjs`, running it, and flagging the sections in
`src/data/curriculum.ts`. Work with small tool outputs — never read whole
source texts into context.

## Procedure

1. **Pick the source.** Must be public domain (US: published before 1931) or
   explicitly licensed (Perseus = CC BY-SA). Prefer Project Gutenberg plain
   text: `https://www.gutenberg.org/cache/epub/<ID>/pg<ID>.txt`. Verify title
   AND translator before using an ID:
   `curl -sL <url> | head -20 | grep -E "^(Title|Translator):"`.
   Known-good sources are listed at the bottom — add new ones as you go.

2. **Inspect the structure** (cheap, do this instead of reading the file):
   `node scripts/inspect-source.mjs <url> [phrase]...`
   It prints Title/Translator, structural headings (INTRODUCTION, BOOK N,
   PERSONS OF THE DIALOGUE, START/END markers) with the words that follow
   each, and the line + surrounding context of any search phrases.

3. **Choose boundaries.**
   - `textStart`: first words of the work proper (raw-text `indexOf`, so it
     must be unique in the file — check with the inspector that it doesn't
     also appear in the introduction).
   - Section `anchor`s: the opening words of the paragraph where each
     curriculum section begins. Verify each is a *paragraph start* (blank
     line before it): `grep -n -B1 "<anchor>" <downloaded file>`.
   - Commentary (introductions/analysis) is extracted automatically from
     between the PG header and `textStart` — no markers needed.

4. **Add the config** to `WORKS` in `scripts/build-texts.mjs`. Follow the
   existing entries; for Jowett/PG use the `JOWETT_PG(id)` helper. Section
   ids must match `src/data/curriculum.ts` exactly and NEVER change once
   users may have progress saved against them.

5. **Run it**: `node scripts/build-texts.mjs <bookId>`. It fails loudly on
   missing/misordered anchors. It prints paragraph counts and estimated
   reading minutes per section.

6. **Sanity-check the output** with `node -e` on the JSON files: first/last
   paragraph of each section should match the expected opening/closing
   words. Check total word count is plausible for the work.

7. **Update `src/data/curriculum.ts`**: set `hasText: true` on each ingested
   section, set `meta.estLength` from the script's printed minutes (round;
   use "~X hrs" over 60), and add `commentary: [{ id, title }]` on the book
   if an introduction was extracted.

8. **Verify + ship**: `npm run build`, open one section in the browser
   preview (check first/last words render, attribution footer present),
   commit, push.

## Structure conventions

- Output: `public/texts/<bookId>/<docId>.json`, lazy-loaded by the app.
- `kind: "text"` = the work itself ("raw material").
  `kind: "commentary"` = interpretive material (translator introductions).
  Never mix them in one document; the app renders commentary behind an
  "Interpretation — not the text" banner.
- Even when commentary isn't shown in the curriculum, still extract it —
  Phase 3 will mine it to draft tutorial questions.

## Gotchas learned so far

- **Anchors match paragraph starts** (`startsWith` after whitespace
  collapse). Mid-paragraph phrases fail; find the paragraph's first words.
- **Roman numeral prefix trap**: "BOOK II" also matches "BOOK III" with
  `startsWith` — include the trailing period ("BOOK II.").
- **Tables of contents** repeat headings: "BOOK I." appears in the Republic's
  TOC long before the text. Use a unique opening phrase as `textStart`
  instead of the heading.
- **Whitespace collapses** during paragraph unwrapping, so anchors with
  double spaces in the source still match with single spaces — but
  `textStart` searches the RAW text, where exact whitespace matters. Prefer
  a prefix that stops before any odd spacing.
- Jowett/PG dialogues consistently open with "PERSONS OF THE DIALOGUE" —
  usable as `textStart` and first-section anchor; keeps the scene-setting
  line in the text, which is useful context.
- All-caps heading paragraphs and "Produced by" credits are stripped
  automatically; anything with lowercase letters is kept.
- **Title-page boilerplate varies per file** ("by Plato", "Translated by…",
  "Contents", "This etext was prepared by…", mixed-case TOC lines like
  "Section 1. Section 2.", "[Illustration]"). `stripBoilerplate` filters
  known patterns only until the first real paragraph. After ingesting,
  ALWAYS print the first paragraph of every commentary/section file — if
  junk survives, add a pattern to `BOILERPLATE` rather than hand-editing.
- **Heading punctuation differs between TOC and text, and between works**:
  Butler's Iliad uses "BOOK I." (period) in the text; his Odyssey uses
  "BOOK I" (no period) in the text but periods in the TOC. Verify against
  the *text* headings (the word-count step surfaces the exact form), not
  the TOC.
- **Endnotes inflate the last section**: Butler's Odyssey appends a
  FOOTNOTES block after Book XXIV (+10k words). Check the last section's
  word count for plausibility; if inflated, set `textEnd`. The end marker
  is searched only after `textStart`, so a TOC entry with the same words
  is harmless.
- **Section sizing**: cap sections at ~45 min (~10,000 words at 230 wpm).
  Before configuring, compute per-unit word counts (split the downloaded
  file on its headings with a quick node one-liner). For Homer, one
  section per book lands at 15–39 min — natural units beat arbitrary
  groupings when they fit the cap.

## Known-good sources

| Work | Source | Translator | Notes |
| --- | --- | --- | --- |
| Plato, all 12 Year-1 dialogues | PG 1656, 1643, 1672, 1657, 1658, 1600, 1497, 1636, 1687, 1726, 1735, 1572 | Jowett | ingested |
| Homer, Iliad / Odyssey | PG 2199 / 1727 | Butler (prose) | ingested; Odyssey needs textEnd 'FOOTNOTES:' |
| Thucydides | PG 7142 | Crawley | verify |
| Herodotus | PG 2707 (Macaulay) | Macaulay | verify |
| Euclid, Elements | no clean PG plain text — consider Heath on archive.org | Heath | needs OCR cleanup, harder |
| Ptolemy Almagest, Pascal Treatise, Spemann | — | — | no PD English translation; tracked-only |

Update this file whenever a run teaches you something new (bad ID, odd
structure, better source, new gotcha).
