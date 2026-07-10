// Curriculum content model — static, authored data. User progress lives
// separately (see progress.ts) so content can grow without migrating state.

export type SectionStatus = 'not_started' | 'in_progress' | 'completed';

export interface Section {
  id: string;
  title: string;
  /** Optional orienting metadata (Phase 2 grows this into a full context panel) */
  meta?: {
    cite?: string; // e.g. Stephanus pages
    estLength?: string; // e.g. "~15 min"
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  sections: Section[];
  edition?: string; // recommended translation/edition
}

export type TrackName = 'Seminar' | 'Language' | 'Mathematics' | 'Music' | 'Laboratory';

export interface Track {
  id: string;
  name: TrackName;
  books: Book[];
}

export interface Year {
  id: string;
  label: string; // "Year 1"
  name: string; // "Freshman"
  tracks: Track[];
}

export interface Curriculum {
  years: Year[];
}

/** Per-section user state, keyed by section id and persisted locally. */
export interface SectionProgress {
  status: SectionStatus;
  notes: string;
  updatedAt: string; // ISO timestamp
}

export type ProgressMap = Record<string, SectionProgress>;
