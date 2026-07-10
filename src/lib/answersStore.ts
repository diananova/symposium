import type { AnswersState, OpenAnswerEntry } from '../types';
import type { KeyValueStorage } from './progressStore';

// Answers to tutorial questions get their own store, separate from
// SectionProgress (status/notes): different shape (per-question, not
// per-section) and different update pattern (factual answers are set once;
// open answers accumulate a history rather than overwrite). Same
// storage-behind-an-interface approach as ProgressStore.

export interface AnswersStore {
  load(): AnswersState;
  save(state: AnswersState): void;
}

const STORAGE_KEY = 'symposium.answers.v1';

const emptyState: AnswersState = { factual: {}, open: {} };

function isAnswersState(value: unknown): value is AnswersState {
  return (
    !!value &&
    typeof value === 'object' &&
    'factual' in value &&
    'open' in value &&
    typeof (value as AnswersState).factual === 'object' &&
    typeof (value as AnswersState).open === 'object'
  );
}

export function createLocalAnswersStore(storage: KeyValueStorage): AnswersStore {
  return {
    load() {
      try {
        const raw = storage.getItem(STORAGE_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : emptyState;
        return isAnswersState(parsed) ? parsed : emptyState;
      } catch {
        return emptyState;
      }
    },
    save(state) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Persistence is best-effort (private browsing, quota); the session
        // keeps working from memory.
      }
    },
  };
}

/** Factual answers are set once per question — re-answering (if ever
 * allowed by the UI) overwrites the prior pick rather than accumulating. */
export function applyFactualAnswer(
  state: AnswersState,
  questionId: string,
  selectedIndex: number,
  correct: boolean,
  now: Date = new Date(),
): AnswersState {
  return {
    ...state,
    factual: {
      ...state.factual,
      [questionId]: { selectedIndex, correct, answeredAt: now.toISOString() },
    },
  };
}

/** Open answers accumulate: each submission is appended so a past answer is
 * never lost, letting the reader compare how their thinking changed. */
export function appendOpenAnswer(
  state: AnswersState,
  questionId: string,
  text: string,
  now: Date = new Date(),
): AnswersState {
  const prior = state.open[questionId] ?? [];
  const entry: OpenAnswerEntry = { text, answeredAt: now.toISOString() };
  return {
    ...state,
    open: {
      ...state.open,
      [questionId]: [...prior, entry],
    },
  };
}
