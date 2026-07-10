# Why the curriculum is structured this way (reference)

Source: *Statement of the St. John's College Program* (sjc.edu, fetched
2026-07-10) — the faculty's own account of the Program. This file grounds
the `context` fields in `src/data/curriculum.ts`; cite it when writing
context for new books.

## Key rationale, in the college's words (quoted/closely paraphrased)

- **The great conversation.** The books "are linked together, for each of
  them is introduced, supported, or criticized by the others. In that sense
  they converse with each other, and they draw the readers to take part …
  in a large and continuing conversation."
- **Why Year 1 is Greek.** "The first year is devoted to Greek authors and
  their pioneering understanding of the liberal arts." Years 2–4 continue:
  Hebrew Bible to 16th century; 17th–18th centuries; 19th–20th centuries.
- **Why chronological.** "The chronological order in which the books are
  read is primarily a matter of convenience and intelligibility; it does not
  imply a historical approach to the subject matter. The curriculum seeks to
  convey … the fundamental problems that human beings have to face today
  and at all times."
- **Why Euclid first in Mathematics.** "Using Euclid's organization of the
  mathematical discoveries of his predecessors, the students gain a notion
  of deductive science and of a mathematical system in general … the theory
  of ratios … buried under the foundations of modern mathematics." Then
  Ptolemy: "hypotheses" constructed to "save the appearances" — mathematics
  applied to phenomena.
- **Why the Language tutorial (Greek).** Training in "precise
  communication," a restoration of grammar, rhetoric, and logic; and support
  of seminar — works "studied in the tutorial, free from the veil of
  ready-made translation." Mastery is explicitly not the aim.
- **Why the Laboratory reads original sources.** The lab studies the
  mathematical interpretation of the universe historically; the first two
  years "cover the period from Homer to Descartes" so that the modern
  revolution can be appreciated when it comes.
- **Seminar mechanics** (useful for section sizing): readings average ~80
  pages per twice-weekly seminar, shorter for difficult texts.

## How the app applies this

Each Year-1 book carries a `context` field with two parts, shown on the
book page BEFORE reading (per the Phase-2 spec: orienting, not
interpretive):

- `background` — who/what/when, 1–3 factual sentences.
- `placement` — why the book sits *here* in the sequence: what it follows,
  answers, or prepares. This is the "conversation" made visible.

Track intros (one sentence on the curriculum page) carry the per-tutorial
rationale above. Keep all of it factual and orienting; interpretation
belongs in commentary docs behind the interpretation banner.
