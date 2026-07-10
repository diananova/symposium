import { describe, expect, it } from 'vitest';
import { clampToWordLimit, wordCount, WORD_LIMIT } from './wordLimit';

describe('wordCount', () => {
  it('counts words split on whitespace', () => {
    expect(wordCount('one two three')).toBe(3);
  });

  it('treats empty and whitespace-only text as zero', () => {
    expect(wordCount('')).toBe(0);
    expect(wordCount('   \n\t  ')).toBe(0);
  });

  it('collapses runs of whitespace and newlines', () => {
    expect(wordCount('one\n\ntwo   three')).toBe(3);
  });
});

describe('clampToWordLimit', () => {
  it('leaves text under the limit untouched', () => {
    const text = 'one two three';
    expect(clampToWordLimit(text, 5)).toBe(text);
  });

  it('leaves text exactly at the limit untouched', () => {
    const text = 'one two three';
    expect(clampToWordLimit(text, 3)).toBe(text);
  });

  it('truncates text over the limit at the nth word boundary', () => {
    expect(clampToWordLimit('one two three four', 2)).toBe('one two');
  });

  it('preserves original whitespace/newlines up to the cutoff', () => {
    expect(clampToWordLimit('one\ntwo   three four', 3)).toBe('one\ntwo   three');
  });

  it('defaults to the 300-word app limit', () => {
    const words = Array.from({ length: 305 }, (_, i) => `w${i}`).join(' ');
    expect(wordCount(clampToWordLimit(words))).toBe(WORD_LIMIT);
  });
});
