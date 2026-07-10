import { describe, expect, it } from 'vitest';
import {
  applyUpdate,
  createLocalStorageStore,
  emptyProgress,
  sectionFraction,
  statusOf,
  type KeyValueStorage,
} from './progressStore';
import type { Section } from '../types';

function fakeStorage(initial: Record<string, string> = {}): KeyValueStorage {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
  };
}

describe('createLocalStorageStore', () => {
  it('round-trips progress', () => {
    const store = createLocalStorageStore(fakeStorage());
    const progress = applyUpdate({}, 'apology-1', { status: 'completed' });
    store.save(progress);
    expect(store.load()).toEqual(progress);
  });

  it('returns empty progress when nothing is stored', () => {
    expect(createLocalStorageStore(fakeStorage()).load()).toEqual({});
  });

  it('recovers from corrupt stored data', () => {
    const store = createLocalStorageStore(
      fakeStorage({ 'symposium.progress.v1': '{not json' }),
    );
    expect(store.load()).toEqual({});
  });

  it('survives storage write failures', () => {
    const store = createLocalStorageStore({
      getItem: () => null,
      setItem: () => {
        throw new Error('quota exceeded');
      },
    });
    expect(() => store.save({})).not.toThrow();
  });
});

describe('applyUpdate', () => {
  it('patches status while keeping notes, and stamps the time', () => {
    const now = new Date('2026-07-10T12:00:00Z');
    let progress = applyUpdate({}, 's1', { notes: 'first thoughts' }, now);
    progress = applyUpdate(progress, 's1', { status: 'in_progress' }, now);
    expect(progress['s1']).toEqual({
      status: 'in_progress',
      notes: 'first thoughts',
      updatedAt: '2026-07-10T12:00:00.000Z',
    });
  });

  it('does not mutate the previous map', () => {
    const before = applyUpdate({}, 's1', { status: 'completed' });
    const after = applyUpdate(before, 's2', { status: 'in_progress' });
    expect(before['s2']).toBeUndefined();
    expect(Object.keys(after)).toHaveLength(2);
  });
});

describe('status helpers', () => {
  const section: Section = { id: 's1', title: 'Test' };

  it('statusOf defaults to not_started', () => {
    expect(statusOf({}, section)).toBe('not_started');
    expect(emptyProgress.status).toBe('not_started');
  });

  it('sectionFraction maps statuses to ring fill', () => {
    expect(sectionFraction('not_started')).toBe(0);
    expect(sectionFraction('in_progress')).toBeGreaterThan(0);
    expect(sectionFraction('completed')).toBe(1);
  });
});
