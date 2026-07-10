// Content pipeline: fetch public-domain translations, strip source
// boilerplate, split into the app's curriculum sections, and write one JSON
// file per section under public/texts/<bookId>/<sectionId>.json.
//
// Run: node scripts/build-texts.mjs
//
// Each work's config lists section anchors: the opening words of the
// paragraph where that section begins in this specific translation/edition.
// Anchors are verified against the source text by hand before being added
// here — if a source file changes upstream and an anchor no longer matches,
// the script fails loudly rather than mis-splitting.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'texts');

const WORKS = [
  {
    bookId: 'plato-apology',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/1656/pg1656.txt',
    attribution: {
      translator: 'Benjamin Jowett',
      license: 'Public domain',
      source: 'Project Gutenberg #1656',
      sourceUrl: 'https://www.gutenberg.org/ebooks/1656',
    },
    // The dialogue proper, skipping Jowett's introduction and PG footer.
    textStart: 'How you, O Athenians, have been affected by my accusers',
    textEnd: '*** END OF THE PROJECT GUTENBERG EBOOK',
    sections: [
      {
        sectionId: 'apology-1',
        title: 'I. Socrates’ Defense Begins',
        cite: '17a–19a',
        anchor: 'How you, O Athenians, have been affected by my accusers',
      },
      {
        sectionId: 'apology-2',
        title: 'II. The Old Accusers & the Oracle',
        cite: '19a–24b',
        anchor: 'I will begin at the beginning, and ask what is the accusation',
      },
      {
        sectionId: 'apology-3',
        title: 'III. The Charge of Corrupting the Young',
        cite: '24b–28a',
        anchor: 'I have said enough in my defence against the first class',
      },
      {
        sectionId: 'apology-4',
        title: 'IV. The Philosopher’s Station',
        cite: '28a–32e',
        anchor: 'I have said enough in answer to the charge of Meletus',
      },
      {
        sectionId: 'apology-5',
        title: 'V. Conclusion of the Defense',
        cite: '32e–35d',
        anchor: 'Now do you really imagine that I could have survived all these years',
      },
      {
        sectionId: 'apology-6',
        title: 'VI. The Verdict & the Counter-Penalty',
        cite: '35e–38b',
        anchor: 'There are many reasons why I am not grieved, O men of Athens',
      },
      {
        sectionId: 'apology-7',
        title: 'VII. On the Fear of Death',
        cite: '38c–42a',
        anchor: 'Not much time will be gained, O Athenians',
      },
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

async function buildWork(work) {
  const res = await fetch(work.sourceUrl);
  if (!res.ok) throw new Error(`${work.bookId}: fetch failed (${res.status}) for ${work.sourceUrl}`);
  const raw = await res.text();

  const start = raw.indexOf(work.textStart);
  const end = raw.indexOf(work.textEnd);
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`${work.bookId}: text start/end markers not found in source`);
  }
  const paragraphs = toParagraphs(raw.slice(start, end));

  // Locate each section's first paragraph by its anchor.
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

  const dir = path.join(OUT_DIR, work.bookId);
  await mkdir(dir, { recursive: true });

  for (let i = 0; i < work.sections.length; i++) {
    const s = work.sections[i];
    const slice = paragraphs.slice(bounds[i], i + 1 < bounds.length ? bounds[i + 1] : undefined);
    const out = {
      bookId: work.bookId,
      sectionId: s.sectionId,
      title: s.title,
      cite: s.cite,
      ...work.attribution,
      paragraphs: slice,
    };
    await writeFile(path.join(dir, `${s.sectionId}.json`), JSON.stringify(out, null, 2) + '\n');
    console.log(`${work.bookId}/${s.sectionId}.json — ${slice.length} paragraphs`);
  }
}

for (const work of WORKS) {
  await buildWork(work);
}
console.log('Done.');
