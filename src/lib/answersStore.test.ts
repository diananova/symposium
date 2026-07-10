import { describe, expect, it } from 'vitest';
import {
  appendOpenAnswer,
  applyFactualAnswer,
  createLocalAnswersStore,
} from './answersStore';
import type { KeyValueStorage } from './progressStore';
import type { AnswersState } from '../types';

function fakeStorage(initial: Record<string, string> = {}): KeyValueStorage {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
  };
}

describe('createLocalAnswersStore', () => {
  it('round-trips answers', () => {
    const store = createLocalAnswersStore(fakeStorage());
    const state = applyFactualAnswer({ factual: {}, open: {} }, 'iliad-1-f1', 0, true);
    store.save(state);
    expect(store.load()).toEqual(state);
  });

  it('returns empty state when nothing is stored', () => {
    expect(createLocalAnswersStore(fakeStorage()).load()).toEqual({ factual: {}, open: {} });
  });

  it('recovers from corrupt stored data', () => {
    const store = createLocalAnswersStore(
      fakeStorage({ 'symposium.answers.v1': '{not json' }),
    );
    expect(store.load()).toEqual({ factual: {}, open: {} });
  });

  it('recovers from stored data of the wrong shape', () => {
    const store = createLocalAnswersStore(
      fakeStorage({ 'symposium.answers.v1': '{"foo":"bar"}' }),
    );
    expect(store.load()).toEqual({ factual: {}, open: {} });
  });

  it('survives storage write failures', () => {
    const store = createLocalAnswersStore({
      getItem: () => null,
      setItem: () => {
        throw new Error('quota exceeded');
      },
    });
    expect(() => store.save({ factual: {}, open: {} })).not.toThrow();
  });
});

describe('applyFactualAnswer', () => {
  it('records the pick, correctness, and timestamp', () => {
    const now = new Date('2026-07-11T09:00:00Z');
    const state = applyFactualAnswer({ factual: {}, open: {} }, 'iliad-1-f1', 2, false, now);
    expect(state.factual['iliad-1-f1']).toEqual({
      selectedIndex: 2,
      correct: false,
      answeredAt: '2026-07-11T09:00:00.000Z',
    });
  });

  it('re-answering overwrites the prior pick for that question', () => {
    let state = applyFactualAnswer({ factual: {}, open: {} }, 'iliad-1-f1', 1, false);
    state = applyFactualAnswer(state, 'iliad-1-f1', 0, true);
    expect(state.factual['iliad-1-f1']).toMatchObject({ selectedIndex: 0, correct: true });
  });

  it('does not mutate the previous state', () => {
    const before: AnswersState = { factual: {}, open: {} };
    const after = applyFactualAnswer(before, 'iliad-1-f1', 0, true);
    expect(before.factual['iliad-1-f1']).toBeUndefined();
    expect(after).not.toBe(before);
  });

  it('leaves other questions and open answers untouched', () => {
    let state = applyFactualAnswer({ factual: {}, open: {} }, 'iliad-1-f1', 0, true);
    state = appendOpenAnswer(state, 'iliad-1-i1', 'my answer');
    state = applyFactualAnswer(state, 'iliad-1-f2', 1, false);
    expect(state.factual['iliad-1-f1']).toMatchObject({ selectedIndex: 0, correct: true });
    expect(state.open['iliad-1-i1']).toHaveLength(1);
  });
});

describe('appendOpenAnswer', () => {
  it('adds a first entry for a question', () => {
    const now = new Date('2026-07-11T09:00:00Z');
    const state = appendOpenAnswer({ factual: {}, open: {} }, 'iliad-1-i1', 'first thoughts', now);
    expect(state.open['iliad-1-i1']).toEqual([
      { text: 'first thoughts', answeredAt: '2026-07-11T09:00:00.000Z' },
    ]);
  });

  it('accumulates history rather than overwriting on a second submission', () => {
    let state = appendOpenAnswer({ factual: {}, open: {} }, 'iliad-1-i1', 'first pass');
    state = appendOpenAnswer(state, 'iliad-1-i1', 'revised thinking');
    expect(state.open['iliad-1-i1'].map((e) => e.text)).toEqual(['first pass', 'revised thinking']);
  });

  it('does not mutate the previous state', () => {
    const before: AnswersState = { factual: {}, open: {} };
    const after = appendOpenAnswer(before, 'iliad-1-i1', 'hello');
    expect(before.open['iliad-1-i1']).toBeUndefined();
    expect(after).not.toBe(before);
  });
});
