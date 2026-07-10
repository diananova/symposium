# External references

Raw copies and citations of the external sources used to ground the
curriculum (content, order, and rationale). Kept here so claims in
`src/data/curriculum.ts` and `docs/*.md` can be checked against the
original rather than re-fetched or taken on faith.

## Archived in full

| File | Source | Fetched | Used for |
| --- | --- | --- | --- |
| [st-johns-statement-of-the-program.pdf](st-johns-statement-of-the-program.pdf) | [sjc.edu](https://www.sjc.edu/) — *Statement of the St. John's College Program* (official PDF; the faculty's own account of the Program) | 2026-07-10 | The `context.placement` rationale in `curriculum.ts` and all of [../curriculum-rationale.md](../curriculum-rationale.md) — why Year 1 is Greek, why order is chronological, why Euclid opens Mathematics, why the Language tutorial and Laboratory read original sources. |
| st-johns-statement-of-the-program.txt | (plain-text extraction of the PDF above, for quoting/grepping) | 2026-07-10 | same |

## Cited by URL (live pages, not archived as files)

Fetched via an LLM-summarizing tool rather than a raw download, so no
byte-for-byte copy is kept — re-fetch the URL directly if a claim needs
re-checking.

| Source | Fetched | Used for |
| --- | --- | --- |
| [sjc.edu — Great Books Reading List](https://www.sjc.edu/academic-programs/undergraduate/great-books-reading-list) | 2026-07-10 | The full Year 1 (freshman) reading list across all four tracks — every author/work now seeded in `curriculum.ts`. |
| [sjc.edu — Schedule of Seminar Readings (Annapolis)](https://www.sjc.edu/academic-programs/undergraduate/classes/seminar/annapolis-undergraduate-readings) | 2026-07-10 | The actual freshman seminar reading **order** (2025–26). Full transcription and mapping notes in [../seminar-reading-order.md](../seminar-reading-order.md); book order in `curriculum.ts` follows it directly. |

## Not archived here: the texts themselves

Public-domain translations (Jowett's Plato, Butler's Homer, etc.) are
fetched live from Project Gutenberg by `scripts/build-texts.mjs`, which
already records each work's exact URL and translator in its `WORKS` config
and stamps that attribution into every generated file under
`public/texts/`. Gutenberg is a stable long-term archive, so there's no
need to duplicate multi-megabyte raw source files here — see
`scripts/build-texts.mjs` and `.claude/skills/add-book/SKILL.md` instead.

## Adding a new reference

When a future session fetches something to justify a curriculum or content
decision: save the raw file here (PDF/HTML/txt) if it was a real download,
or add a row to the URL table above if it was only summarized. Always
record the fetch date — pages change.
