import type { ProgressMap, Section, SectionProgress, SectionStatus } from '../types';

// The app's only mutable state lives behind this interface. v1 persists to
// localStorage; a synced backend (Firestore, API) can replace it later by
// implementing ProgressStore — nothing above this layer changes.

export interface ProgressStore {
  load(): ProgressMap;
  save(progress: ProgressMap): void;
}

const STORAGE_KEY = 'symposium.progress.v1';

/** Minimal slice of the DOM Storage interface, injectable for tests. */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function createLocalStorageStore(storage: KeyValueStorage): ProgressStore {
  return {
    load() {
      try {
        const raw = storage.getItem(STORAGE_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? (parsed as ProgressMap) : {};
      } catch {
        return {};
      }
    },
    save(progress) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch {
        // Persistence is best-effort (private browsing, quota); the session
        // keeps working from memory.
      }
    },
  };
}

export const emptyProgress: SectionProgress = {
  status: 'not_started',
  notes: '',
  updatedAt: '',
};

export function applyUpdate(
  progress: ProgressMap,
  sectionId: string,
  patch: Partial<Pick<SectionProgress, 'status' | 'notes'>>,
  now: Date = new Date(),
): ProgressMap {
  const current = progress[sectionId] ?? emptyProgress;
  return {
    ...progress,
    [sectionId]: { ...current, ...patch, updatedAt: now.toISOString() },
  };
}

export function statusOf(progress: ProgressMap, section: Section): SectionStatus {
  return (progress[section.id] ?? emptyProgress).status;
}

/** How full a section's kylix is drawn for a given status. */
export function sectionFraction(status: SectionStatus): number {
  if (status === 'completed') return 1;
  if (status === 'in_progress') return 0.4;
  return 0;
}
