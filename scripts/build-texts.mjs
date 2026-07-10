// Content pipeline: fetch public-domain translations, strip source
// boilerplate, split into the app's curriculum sections, and write one JSON
// file per document under public/texts/<bookId>/.
//
// Run: node scripts/build-texts.mjs [bookId ...]   (no args = all works)
//
// Two kinds of documents are produced, distinguished by a `kind` field:
//   - kind "text": the work itself ("raw material"), one file per
//     curriculum section
//   - kind "commentary": the edition's introduction/analysis
//     ("interpretation"), kept separate from the text so the app can always
//     draw the line clearly and Phase 3 can mine it for questions
//
// Each work's config lists section anchors: the opening words of the
// paragraph where that section begins in this specific translation/edition.
// Anchors are verified against the source (scripts/inspect-source.mjs)
// before being added here — if a source file changes upstream and an anchor
// stops matching, the script fails loudly rather than mis-splitting.
//
// See .claude/skills/add-book/SKILL.md for the step-by-step recipe.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'texts');

const PG_END = '*** END OF THE PROJECT GUTENBERG EBOOK';
const PG_START = 'START OF THE PROJECT GUTENBERG EBOOK';

const JOWETT_PG = (id) => ({
  sourceUrl: `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`,
  attribution: {
    translator: 'Benjamin Jowett',
    license: 'Public domain',
    source: `Project Gutenberg #${id}`,
    sourceUrl: `https://www.gutenberg.org/ebooks/${id}`,
  },
});

// In Jowett's Gutenberg editions the dialogue proper opens with the persons
// of the dialogue; everything between the PG header and that point is
// Jowett's interpretive introduction.
const PERSONS = 'PERSONS OF THE DIALOGUE';
const JOWETT_INTRO = { id: 'jowett-introduction', title: 'Jowett’s Introduction' };

const WORKS = [
  {
    bookId: 'plato-apology',
    ...JOWETT_PG(1656),
    textStart: 'How you, O Athenians, have been affected by my accusers',
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'apology-1', title: 'I. Socrates’ Defense Begins', cite: '17a–19a', anchor: 'How you, O Athenians, have been affected by my accusers' },
      { sectionId: 'apology-2', title: 'II. The Old Accusers & the Oracle', cite: '19a–24b', anchor: 'I will begin at the beginning, and ask what is the accusation' },
      { sectionId: 'apology-3', title: 'III. The Charge of Corrupting the Young', cite: '24b–28a', anchor: 'I have said enough in my defence against the first class' },
      { sectionId: 'apology-4', title: 'IV. The Philosopher’s Station', cite: '28a–32e', anchor: 'I have said enough in answer to the charge of Meletus' },
      { sectionId: 'apology-5', title: 'V. Conclusion of the Defense', cite: '32e–35d', anchor: 'Now do you really imagine that I could have survived all these years' },
      { sectionId: 'apology-6', title: 'VI. The Verdict & the Counter-Penalty', cite: '35e–38b', anchor: 'There are many reasons why I am not grieved, O men of Athens' },
      { sectionId: 'apology-7', title: 'VII. On the Fear of Death', cite: '38c–42a', anchor: 'Not much time will be gained, O Athenians' },
    ],
  },
  {
    bookId: 'plato-meno',
    ...JOWETT_PG(1643),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'meno-1', title: 'The complete dialogue', cite: '70a–100b', anchor: PERSONS },
    ],
  },
  {
    bookId: 'plato-gorgias',
    ...JOWETT_PG(1672),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'gorgias-1', title: 'Gorgias & Polus', cite: '447a–481b', anchor: PERSONS },
      { sectionId: 'gorgias-2', title: 'Callicles', cite: '481b–527e', anchor: 'CALLICLES: Tell me, Chaerephon' },
    ],
  },
  {
    bookId: 'plato-crito',
    ...JOWETT_PG(1657),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'crito-1', title: 'The complete dialogue', cite: '43a–54e', anchor: PERSONS },
    ],
  },
  {
    bookId: 'plato-phaedo',
    ...JOWETT_PG(1658),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'phaedo-1', title: 'Opening & first arguments', cite: '57a–84b', anchor: PERSONS },
      { sectionId: 'phaedo-2', title: 'Final argument & death scene', cite: '84c–118a', anchor: 'When Socrates had done speaking' },
    ],
  },
  {
    bookId: 'plato-symposium',
    ...JOWETT_PG(1600),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'symposium-1', title: 'The first speeches', cite: '172a–197e', anchor: PERSONS },
      { sectionId: 'symposium-2', title: 'Socrates & Alcibiades', cite: '198a–223d', anchor: 'When Agathon had done speaking' },
    ],
  },
  {
    bookId: 'plato-republic',
    ...JOWETT_PG(1497),
    textStart: 'I went down yesterday to the Piraeus',
    commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction and Analysis' }],
    sections: [
      // "BOOK II." with the period — "BOOK III." starts with "BOOK II" without it.
      { sectionId: 'republic-1', title: 'Book I', anchor: 'I went down yesterday to the Piraeus' },
      { sectionId: 'republic-2', title: 'Books II–IV', anchor: 'BOOK II.' },
      { sectionId: 'republic-3', title: 'Books V–VII', anchor: 'BOOK V.' },
      { sectionId: 'republic-4', title: 'Books VIII–X', anchor: 'BOOK VIII.' },
    ],
  },
  {
    bookId: 'plato-phaedrus',
    ...JOWETT_PG(1636),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'phaedrus-1', title: 'The complete dialogue', cite: '227a–279c', anchor: PERSONS },
    ],
  },
  {
    bookId: 'plato-parmenides',
    ...JOWETT_PG(1687),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'parmenides-1', title: 'The complete dialogue', anchor: PERSONS },
    ],
  },
  {
    bookId: 'plato-theaetetus',
    ...JOWETT_PG(1726),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'theaetetus-1', title: 'The complete dialogue', anchor: PERSONS },
    ],
  },
  {
    bookId: 'plato-sophist',
    ...JOWETT_PG(1735),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'sophist-1', title: 'The complete dialogue', anchor: PERSONS },
    ],
  },
  {
    bookId: 'plato-timaeus',
    ...JOWETT_PG(1572),
    textStart: PERSONS,
    commentary: [JOWETT_INTRO],
    sections: [
      { sectionId: 'timaeus-1', title: 'The complete dialogue', anchor: PERSONS },
    ],
  },
];

/** Split raw text into paragraphs: blank-line separated, unwrapping hard line breaks. */
function toParagraphs(raw) {
  return raw
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

/** Drop edition boilerplate: title-page credits, transcriber notes, TOC, and
 * all-caps heading paragraphs. */
const BOILERPLATE = [
  /^Produced by /,
  /^This etext was prepared by /i,
  /^by Plato$/i,
  /^Translated(,| by| with)/i,
  /^Contents$/i,
  /^Note: See also /,
  /^[A-Za-z’' ]{1,40}$/, // bare title/heading line, e.g. "Apology"
  /^(INTRODUCTION[A-Z .]*)?(Section \d+\.?\s*)+$/, // table of contents
];
function stripBoilerplate(paragraphs) {
  // Boilerplate only occurs before the introduction's first real paragraph;
  // stop filtering once we hit a paragraph that survives.
  const start = paragraphs.findIndex(
    (p) => /[a-z]/.test(p) && !BOILERPLATE.some((re) => re.test(p)),
  );
  return paragraphs.slice(start === -1 ? 0 : start).filter((p) => /[a-z]/.test(p));
}

const words = (paragraphs) => paragraphs.join(' ').split(/\s+/).length;
const estMinutes = (paragraphs) => Math.max(1, Math.round(words(paragraphs) / 230));

async function buildWork(work) {
  const res = await fetch(work.sourceUrl);
  if (!res.ok) throw new Error(`${work.bookId}: fetch failed (${res.status}) for ${work.sourceUrl}`);
  const raw = await res.text();

  const headerEnd = raw.indexOf(PG_START);
  const start = raw.indexOf(work.textStart);
  const end = raw.indexOf(work.textEnd ?? PG_END);
  if (headerEnd === -1 || start === -1 || end === -1 || end <= start) {
    throw new Error(`${work.bookId}: text start/end markers not found in source`);
  }

  const dir = path.join(OUT_DIR, work.bookId);
  await mkdir(dir, { recursive: true });

  // --- Commentary ("interpretation"): everything before the text proper ---
  for (const c of work.commentary ?? []) {
    const paragraphs = stripBoilerplate(toParagraphs(raw.slice(headerEnd, start)));
    if (paragraphs.length === 0) throw new Error(`${work.bookId}/${c.id}: empty commentary`);
    const out = {
      kind: 'commentary',
      bookId: work.bookId,
      docId: c.id,
      title: c.title,
      ...work.attribution,
      paragraphs,
    };
    await writeFile(path.join(dir, `${c.id}.json`), JSON.stringify(out, null, 2) + '\n');
    console.log(`${work.bookId}/${c.id} (commentary) — ${paragraphs.length} ¶, ~${estMinutes(paragraphs)} min`);
  }

  // --- The text itself ("raw material"), split into curriculum sections ---
  const paragraphs = toParagraphs(raw.slice(start, end));
  const bounds = work.sections.map((s) => {
    const idx = paragraphs.findIndex((p) => p.startsWith(s.anchor));
    if (idx === -1) throw new Error(`${work.bookId}/${s.sectionId}: anchor not found: "${s.anchor}"`);
    return idx;
  });
  for (let i = 1; i < bounds.length; i++) {
    if (bounds[i] <= bounds[i - 1]) {
      throw new Error(`${work.bookId}: section anchors out of order at ${work.sections[i].sectionId}`);
    }
  }

  for (let i = 0; i < work.sections.length; i++) {
    const s = work.sections[i];
    const slice = paragraphs.slice(bounds[i], i + 1 < bounds.length ? bounds[i + 1] : undefined);
    const out = {
      kind: 'text',
      bookId: work.bookId,
      docId: s.sectionId,
      title: s.title,
      cite: s.cite,
      ...work.attribution,
      paragraphs: slice,
    };
    await writeFile(path.join(dir, `${s.sectionId}.json`), JSON.stringify(out, null, 2) + '\n');
    console.log(`${work.bookId}/${s.sectionId} — ${slice.length} ¶, ~${estMinutes(slice)} min`);
  }
}

const only = process.argv.slice(2);
for (const work of WORKS) {
  if (only.length && !only.includes(work.bookId)) continue;
  await buildWork(work);
}
console.log('Done.');
