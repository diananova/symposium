# Writing tutorial questions (research + drafting guide)

How to produce the per-section reading questions cheaply and consistently,
without re-doing the source research each time. Companion to
`.claude/skills/add-book/SKILL.md` (which covers ingesting the *text*; this
covers the *questions* that go with each section).

## What we're making

For each section of a work:

- **Before (guiding): 2–3 questions.** Purpose-setting / advance
  organizers. They give the reader a *lens* and prime engaged reading.
  **Hard rule: no spoilers.** "Watch how honour is measured," not "notice
  that Achilles refuses the embassy."
- **After: 5–8 questions, laddered** using the Great Books *Shared Inquiry*
  taxonomy (see sources):
  - **Factual** (~2) — one right answer; checks the events landed. These
    are also the raw material for future spaced-repetition/retention cards.
  - **Interpretive** (~3–4) — more than one defensible answer, grounded in
    the text. The heart of the set.
  - **Evaluative** (~1–2) — the reader's judgment. From the second section
    of a work onward, use these to **cross-link earlier reading** ("how does
    this compare with X in Book I / in the Iliad / with Socrates on…"). That
    reinforces curriculum cohesion *and* aids retention through connection.

## Non-negotiable gotchas

- **Match the hosted translation's vocabulary.** We host public-domain
  translations, which are often old and use variant names. Butler's Homer
  uses the Latinate gods — **Jove, Juno, Minerva, Vulcan, Neptune, Ulysses**
  (not Zeus/Hera/Athena/Hephaestus/Poseidon/Odysseus). Jowett's Plato has
  its own conventions. Before drafting, grep the actual file in
  `public/texts/<bookId>/` for the names/terms you plan to use, so questions
  match what the reader sees. Cheap check:
  `node -e "const t=require('./public/texts/<bookId>/<docId>.json').paragraphs.join(' '); for (const n of ['Zeus','Jove','Athena','Minerva',...]) if(t.includes(n)) console.log(n)"`
- **Anchor to the passage, not the plot.** Tutorial-quality questions point
  at a specific scene/moment ("when Minerva checks Achilles' hand"), not
  "what did you think of this book."
- **Never copy questions** from the copyrighted sources below. Consult them
  for level, phrasing, and coverage; write our own. (We host content, so
  copied question sets are a real liability.)

## Where to look (tiered by reusability, not just quality)

Because we host content, licence matters as much as quality.

**Tier 1 — genuinely open-licensed (adaptable with attribution):**
- Open University, *Introducing Homer's Iliad* — OpenLearn, CC BY-NC-SA:
  https://www.open.edu/openlearn/history-the-arts/introducing-homers-iliad/content-section-0
- OER Commons (search per work): https://oercommons.org/oer

**Tier 2 — free to distribute, NOT clearly free to adapt (models, not copy):**
- David Bruce, *Discussion Guides* (full book-by-book Q&A for Iliad,
  Odyssey, Dante, more). Generous permission to *give away*, but that's a
  distribution licence, not a derivative-works licence — don't rework his
  questions into our format without asking him.
  https://davidbruceblog.wordpress.com/ (and davidbruceblog4.wordpress.com)

**Tier 3 — free to view, fully copyrighted (inspiration only):**
- Great Books Foundation — *Shared Inquiry* method (the factual/
  interpretive/evaluative taxonomy itself; a method, not copyrightable):
  https://www.greatbooks.org/nonprofit-organization/what-is-shared-inquiry/
- GVSU, Webster's Iliad reading questions (strong interpretive models):
  https://faculty.gvsu.edu/websterm/Iliad.htm
- Cornell College, Benton's Iliad study questions:
  https://www.cornellcollege.edu/classical_studies/cbenton/Myth/questions/Iliad.htm
- Columbia Core & Baruch reading guides (Ivy core-curriculum, closest in
  spirit to St. John's): core100.columbia.edu, blogs.baruch.cuny.edu/eng2800

**Avoid:** Course Hero, SparkNotes, Study.com, Shmoop — copyrighted,
commercial, pedagogically thin.

(These same URLs are logged in `docs/references/README.md` for provenance.)

## Fast workflow per work

1. Skim one Tier-3 set (e.g. GVSU) + the Shared Inquiry taxonomy to
   calibrate level. Don't copy.
2. Grep the hosted text file for names/terms (translation-vocabulary check).
3. Draft per section: 2–3 pre (no spoilers) + 5–8 post (factual →
   interpretive → evaluative), passage-anchored, cross-linking prior reading
   from section 2 onward.
4. **Human review before publishing** — per the build prompt, questions are
   drafted with Claude but the user approves before they go live. Never
   auto-publish.

## Citing sources in the app

Per the user: do **not** surface these sources as post-answer links. If we
credit them at all, it belongs later in an About/Settings/acknowledgements
section, not in the reading flow.
