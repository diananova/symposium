import type { AnswersState, Book, Section } from '../types';
import { useQuestionSet } from '../lib/useQuestionSet';
import { FactualQuestions, OpenQuestions } from './Questions';

interface QuestionsPageProps {
  book: Book;
  section: Section;
  answers: AnswersState;
  onAnswerFactual: (questionId: string, selectedIndex: number, correct: boolean) => void;
  onSubmitOpenAnswer: (questionId: string, text: string) => void;
  onBack: () => void;
}

export function QuestionsPage({
  book,
  section,
  answers,
  onAnswerFactual,
  onSubmitOpenAnswer,
  onBack,
}: QuestionsPageProps) {
  // Cached by useQuestionSet, so this doesn't re-fetch what SectionDetail
  // already loaded for the guiding questions.
  const state = useQuestionSet(book.id, section.id, true);

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        ‹ {section.title}
      </button>

      <div className="crumb">
        {book.title} · {section.title}
      </div>
      <h1 className="passage-title">Questions</h1>

      {state.status === 'loading' && <div className="reader-status">Fetching the questions…</div>}
      {state.status === 'error' && (
        <div className="reader-status">The questions could not be loaded.</div>
      )}
      {state.status === 'ready' && (
        <>
          <FactualQuestions
            questions={state.data.factual}
            answers={answers.factual}
            onAnswer={onAnswerFactual}
          />
          <OpenQuestions
            questions={state.data.open}
            answers={answers.open}
            onSubmit={onSubmitOpenAnswer}
          />
        </>
      )}
    </>
  );
}
