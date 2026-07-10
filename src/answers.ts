import { useCallback, useMemo, useState } from 'react';
import type { AnswersState } from './types';
import { appendOpenAnswer, applyFactualAnswer, createLocalAnswersStore } from './lib/answersStore';

const emptyAnswers: AnswersState = { factual: {}, open: {} };

export function useAnswers() {
  const store = useMemo(() => createLocalAnswersStore(window.localStorage), []);
  const [answers, setAnswers] = useState<AnswersState>(() => store.load());

  const answerFactual = useCallback(
    (questionId: string, selectedIndex: number, correct: boolean) => {
      setAnswers((prev) => {
        const next = applyFactualAnswer(prev, questionId, selectedIndex, correct);
        store.save(next);
        return next;
      });
    },
    [store],
  );

  const submitOpenAnswer = useCallback(
    (questionId: string, text: string) => {
      setAnswers((prev) => {
        const next = appendOpenAnswer(prev, questionId, text);
        store.save(next);
        return next;
      });
    },
    [store],
  );

  return { answers, answerFactual, submitOpenAnswer };
}

export { emptyAnswers };
