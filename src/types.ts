// Curriculum content model — static, authored data. User progress lives
// separately (see progress.ts) so content can grow without migrating state.

export type SectionStatus = 'not_started' | 'in_progress' | 'completed';

export interface Section {
  id: string;
  title: string;
  /** True when a public-domain text exists at /texts/<bookId>/<sectionId>.json */
  hasText?: boolean;
  /** True when a question set exists at /questions/<bookId>/<sectionId>.json */
  hasQuestions?: boolean;
  /** Optional orienting metadata (Phase 2 grows this into a full context panel) */
  meta?: {
    cite?: string; // e.g. Stephanus pages
    estLength?: string; // e.g. "~15 min"
  };
}

/** Shape of the per-document files produced by scripts/build-texts.mjs.
 * kind "text" is the work itself; kind "commentary" is the edition's
 * interpretive introduction — always presented as distinct from the text. */
export interface TextDoc {
  kind: 'text' | 'commentary';
  bookId: string;
  docId: string;
  title: string;
  cite?: string;
  translator: string;
  license: string;
  source: string;
  sourceUrl: string;
  paragraphs: string[];
}

/** Reference from a Book to a commentary document shipped with its edition. */
export interface CommentaryRef {
  id: string;
  title: string;
}

/** A single multiple-choice comprehension question. Auto-graded. */
export interface FactualQuestion {
  id: string;
  kind: 'factual';
  prompt: string;
  /** Exactly 4 options. */
  options: string[];
  correctIndex: number;
  /** One sentence, revealed after the reader answers; cites the passage. */
  explanation: string;
}

/** A free-text question — interpretive (multiple defensible answers) or
 * evaluative (the reader's judgment). Never auto-graded. */
export interface OpenQuestion {
  id: string;
  kind: 'interpretive' | 'evaluative';
  prompt: string;
}

/** Shape of /public/questions/<bookId>/<sectionId>.json. Fixed shape per
 * docs/finding-questions.md: 2-3 guiding + 5 factual + 4 interpretive + 1
 * evaluative. */
export interface QuestionSet {
  bookId: string;
  sectionId: string;
  /** Shown BEFORE reading; no answer captured, purely a lens. No spoilers. */
  guiding: string[];
  /** Shown AFTER reading; exactly 5. */
  factual: FactualQuestion[];
  /** Shown AFTER reading; exactly 4 interpretive then 1 evaluative. */
  open: OpenQuestion[];
}

/** Persisted answer to one factual question. */
export interface FactualAnswer {
  selectedIndex: number;
  correct: boolean;
  answeredAt: string;
}

/** One submission to an open question. Multiple accumulate over time so the
 * reader can see their thinking change on revisit — never overwritten. */
export interface OpenAnswerEntry {
  text: string;
  answeredAt: string;
}

/** All answers, keyed by question id (globally unique — see answersStore.ts). */
export interface AnswersState {
  factual: Record<string, FactualAnswer>;
  open: Record<string, OpenAnswerEntry[]>;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  sections: Section[];
  edition?: string; // recommended translation/edition
  /** Orienting context shown BEFORE reading — factual, not interpretive.
   * background: who/what/when. placement: why the book sits here in the
   * sequence (see docs/curriculum-rationale.md). */
  context?: {
    background: string;
    placement: string;
  };
  /** Interpretive material (translator introductions etc.) — never mixed with the text */
  commentary?: CommentaryRef[];
}

export type TrackName = 'Seminar' | 'Language' | 'Mathematics' | 'Music' | 'Laboratory';

export interface Track {
  id: string;
  name: TrackName;
  /** One-sentence rationale for the tutorial, shown on the curriculum page */
  intro?: string;
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
