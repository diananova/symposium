import type { Book, CommentaryRef, Section, Track, Year } from '../types';
import { curriculum } from './curriculum';

export interface BookContext {
  year: Year;
  track: Track;
  book: Book;
}

const bookIndex = new Map<string, BookContext>();
for (const year of curriculum.years) {
  for (const track of year.tracks) {
    for (const book of track.books) {
      bookIndex.set(book.id, { year, track, book });
    }
  }
}

export function findBook(bookId: string | undefined): BookContext | undefined {
  return bookId ? bookIndex.get(bookId) : undefined;
}

export function findSection(book: Book, docId: string | undefined): Section | undefined {
  return book.sections.find((s) => s.id === docId);
}

export function findCommentary(book: Book, docId: string | undefined): CommentaryRef | undefined {
  return book.commentary?.find((c) => c.id === docId);
}

export function findYear(yearId: string | undefined): Year | undefined {
  return curriculum.years.find((y) => y.id === yearId);
}
