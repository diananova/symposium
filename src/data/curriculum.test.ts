import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { curriculum } from './curriculum';

const allBooks = curriculum.years.flatMap((y) => y.tracks.flatMap((t) => t.books));
const allSections = allBooks.flatMap((b) => b.sections);
const textsDir = path.join(__dirname, '..', '..', 'public', 'texts');

describe('curriculum invariants', () => {
  it('section ids are globally unique (progress is keyed by them)', () => {
    const ids = allSections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('book ids are globally unique (routes are keyed by them)', () => {
    const ids = allBooks.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every hasText section has its text file on disk', () => {
    for (const book of allBooks) {
      for (const section of book.sections) {
        if (section.hasText) {
          const file = path.join(textsDir, book.id, `${section.id}.json`);
          expect(existsSync(file), `missing ${book.id}/${section.id}.json`).toBe(true);
        }
      }
    }
  });

  it('every commentary ref has its file on disk', () => {
    for (const book of allBooks) {
      for (const c of book.commentary ?? []) {
        const file = path.join(textsDir, book.id, `${c.id}.json`);
        expect(existsSync(file), `missing ${book.id}/${c.id}.json`).toBe(true);
      }
    }
  });

  it('every Year 1 book carries curriculum context (background + placement)', () => {
    const year1Books = curriculum.years[0].tracks.flatMap((t) => t.books);
    for (const book of year1Books) {
      expect(book.context?.background, `${book.id} missing context.background`).toBeTruthy();
      expect(book.context?.placement, `${book.id} missing context.placement`).toBeTruthy();
    }
  });

  it('Year 1 seminar follows the documented reading order', () => {
    // Guard against accidental reorder; docs/seminar-reading-order.md is the
    // authority — update both together, deliberately.
    const seminar = curriculum.years[0].tracks.find((t) => t.name === 'Seminar');
    const first = seminar?.books.slice(0, 5).map((b) => b.id);
    expect(first).toEqual([
      'homer-iliad',
      'homer-odyssey',
      'plato-meno',
      'aeschylus-tragedies',
      'plato-gorgias',
    ]);
    expect(seminar?.books.at(-1)?.id).toBe('plato-phaedrus');
  });
});
