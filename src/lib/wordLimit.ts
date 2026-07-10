// Hard word-limit enforcement for open-question answers (300 words, per
// docs/finding-questions.md). Pure so it's cheaply testable; the textarea
// calls clampToWordLimit on every change so typing/pasting past the limit
// is truncated rather than merely warned about.

export const WORD_LIMIT = 300;

export function wordCount(text: string): number {
  const matches = text.match(/\S+/g);
  return matches ? matches.length : 0;
}

/** Truncates text to at most `limit` words, preserving original spacing/
 * newlines up to the cutoff (does not collapse whitespace). */
export function clampToWordLimit(text: string, limit: number = WORD_LIMIT): string {
  const matches = [...text.matchAll(/\S+/g)];
  if (matches.length <= limit) return text;
  const nth = matches[limit - 1];
  const cutoff = nth.index! + nth[0].length;
  return text.slice(0, cutoff);
}
