import { useEffect, useState } from 'react';
import type { QuestionSet } from '../types';

// Question sets are fetched lazily from /public/questions/, same pattern as
// Reader.tsx's text fetching: cached in memory, no re-fetch on revisit.

const cache = new Map<string, QuestionSet>();

type State =
  | { status: 'disabled' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: QuestionSet };

export function useQuestionSet(bookId: string, sectionId: string, enabled: boolean): State {
  const key = `${bookId}/${sectionId}`;
  const cached = cache.get(key);
  const [state, setState] = useState<State>(() => {
    if (!enabled) return { status: 'disabled' };
    return cached ? { status: 'ready', data: cached } : { status: 'loading' };
  });

  useEffect(() => {
    if (!enabled) {
      setState({ status: 'disabled' });
      return;
    }
    const hit = cache.get(key);
    if (hit) {
      setState({ status: 'ready', data: hit });
      return;
    }
    let cancelled = false;
    setState({ status: 'loading' });
    fetch(`${import.meta.env.BASE_URL}questions/${key}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json() as Promise<QuestionSet>;
      })
      .then((data) => {
        cache.set(key, data);
        if (!cancelled) setState({ status: 'ready', data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [key, enabled]);

  return state;
}
