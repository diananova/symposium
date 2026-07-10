import { useState } from 'react';
import type { AnswersState, FactualQuestion, OpenQuestion } from '../types';
import { clampToWordLimit, wordCount, WORD_LIMIT } from '../lib/wordLimit';

// Three pieces of the fixed 2-3 guiding + 5 factual + 4 interpretive + 1
// evaluative shape (docs/finding-questions.md). Guiding renders before the
// Reader; factual and open render after it. No gate: all of this is
// optional and non-blocking — nothing here hides the text or sequences it.

export function GuidingQuestions({ questions }: { questions: string[] }) {
  if (questions.length === 0) return null;
  return (
    <div className="guiding-block">
      <div className="guiding-label">Before You Read</div>
      <ol className="guiding-list">
        {questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ol>
    </div>
  );
}

interface FactualQuestionsProps {
  questions: FactualQuestion[];
  answers: AnswersState['factual'];
  onAnswer: (questionId: string, selectedIndex: number, correct: boolean) => void;
}

export function FactualQuestions({ questions, answers, onAnswer }: FactualQuestionsProps) {
  if (questions.length === 0) return null;
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const correctCount = questions.filter((q) => answers[q.id]?.correct).length;

  return (
    <div className="factual-block">
      <div className="factual-label">
        Check Your Reading
        {answeredCount > 0 && (
          <span className="factual-score">
            {' '}
            · {correctCount} / {answeredCount} correct
          </span>
        )}
      </div>
      {questions.map((q, qi) => {
        const answer = answers[q.id];
        return (
          <div key={q.id} className="factual-item">
            <div className="factual-prompt">
              {qi + 1}. {q.prompt}
            </div>
            <div className="factual-options" role="radiogroup" aria-label={q.prompt}>
              {q.options.map((opt, oi) => {
                const isSelected = answer?.selectedIndex === oi;
                const isCorrectOpt = oi === q.correctIndex;
                let cls = 'factual-option';
                if (answer) {
                  if (isCorrectOpt) cls += ' correct';
                  else if (isSelected) cls += ' incorrect';
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={cls}
                    disabled={!!answer}
                    onClick={() => onAnswer(q.id, oi, oi === q.correctIndex)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answer && <div className="factual-explanation">{q.explanation}</div>}
          </div>
        );
      })}
    </div>
  );
}

interface OpenQuestionsProps {
  questions: OpenQuestion[];
  answers: AnswersState['open'];
  onSubmit: (questionId: string, text: string) => void;
}

export function OpenQuestions({ questions, answers, onSubmit }: OpenQuestionsProps) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  if (questions.length === 0) return null;

  return (
    <div className="open-block">
      <div className="open-label">Think It Through</div>
      {questions.map((q) => {
        const history = answers[q.id] ?? [];
        const draft = drafts[q.id] ?? '';
        const count = wordCount(draft);
        return (
          <div key={q.id} className="open-item">
            <div className={`open-kind open-kind-${q.kind}`}>
              {q.kind === 'evaluative' ? 'Evaluative' : 'Interpretive'}
            </div>
            <div className="open-prompt">{q.prompt}</div>

            {history.map((entry, i) => (
              <div key={i} className="open-past">
                <div className="open-past-meta">
                  {new Date(entry.answeredAt).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </div>
                <p>{entry.text}</p>
              </div>
            ))}

            <textarea
              className="open-textarea"
              placeholder="Write your thoughts…"
              value={draft}
              onChange={(e) =>
                setDrafts((prev) => ({ ...prev, [q.id]: clampToWordLimit(e.target.value) }))
              }
            />
            <div className="open-footer">
              <span className={`open-count${count >= WORD_LIMIT ? ' at-limit' : ''}`}>
                {count} / {WORD_LIMIT} words
              </span>
              <button
                type="button"
                className="open-submit"
                disabled={draft.trim() === ''}
                onClick={() => {
                  onSubmit(q.id, draft.trim());
                  setDrafts((prev) => ({ ...prev, [q.id]: '' }));
                }}
              >
                Save answer
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
