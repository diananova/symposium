import type { AnswersState, Book, Section, SectionProgress, SectionStatus } from '../types';
import { Kylix } from './Kylix';
import { Reader } from './Reader';
import { GuidingQuestions, FactualQuestions, OpenQuestions } from './Questions';
import { useQuestionSet } from '../lib/useQuestionSet';

interface SectionDetailProps {
  book: Book;
  section: Section;
  progress: SectionProgress;
  answers: AnswersState;
  onSetStatus: (status: SectionStatus) => void;
  onSetNotes: (notes: string) => void;
  onAnswerFactual: (questionId: string, selectedIndex: number, correct: boolean) => void;
  onSubmitOpenAnswer: (questionId: string, text: string) => void;
  onBack: () => void;
}

const STATUS_OPTIONS: { value: SectionStatus; label: string }[] = [
  { value: 'not_started', label: 'Not started' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'completed', label: 'Complete' },
];

function fractionFor(status: SectionStatus) {
  return status === 'completed' ? 1 : status === 'in_progress' ? 0.4 : 0;
}

export function SectionDetail({
  book,
  section,
  progress,
  answers,
  onSetStatus,
  onSetNotes,
  onAnswerFactual,
  onSubmitOpenAnswer,
  onBack,
}: SectionDetailProps) {
  const questionState = useQuestionSet(book.id, section.id, !!section.hasQuestions);
  const questions = questionState.status === 'ready' ? questionState.data : undefined;

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        ‹ {book.title}
      </button>

      <div className="crumb">
        {book.title} · {book.author}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 className="passage-title">{section.title}</h1>
          <div className="section-meta">
            {section.meta?.cite && <>{section.meta.cite}</>}
            {section.meta?.estLength && <> · {section.meta.estLength}</>}
          </div>
        </div>
        <Kylix
          size={46}
          fraction={fractionFor(progress.status)}
          olive={progress.status === 'completed'}
        />
      </div>

      <div className="status-label">Reading status</div>
      <div className="status-row" role="radiogroup" aria-label="Reading status">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            role="radio"
            aria-checked={progress.status === opt.value}
            className={`status-btn${progress.status === opt.value ? ` active-${opt.value}` : ''}`}
            onClick={() => onSetStatus(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {questions && <GuidingQuestions questions={questions.guiding} />}

      {section.hasText && (
        <>
          <div className="reading-label">The Reading</div>
          <Reader bookId={book.id} docId={section.id} />
        </>
      )}

      {questions && (
        <>
          <FactualQuestions
            questions={questions.factual}
            answers={answers.factual}
            onAnswer={onAnswerFactual}
          />
          <OpenQuestions
            questions={questions.open}
            answers={answers.open}
            onSubmit={onSubmitOpenAnswer}
          />
        </>
      )}

      <div className="notes-label">Notes</div>
      <textarea
        className="notes-box"
        placeholder="Questions, passages to return to, first impressions…"
        value={progress.notes}
        onChange={(e) => onSetNotes(e.target.value)}
      />
      {progress.updatedAt && (
        <div className="notes-saved">
          Saved · {new Date(progress.updatedAt).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </div>
      )}
    </>
  );
}
