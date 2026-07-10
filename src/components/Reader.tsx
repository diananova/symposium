import { useEffect, useState } from 'react';
import type { TextDoc } from '../types';

interface ReaderProps {
  bookId: string;
  docId: string;
}

const cache = new Map<string, TextDoc>();

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; text: TextDoc };

export function Reader({ bookId, docId }: ReaderProps) {
  const key = `${bookId}/${docId}`;
  const cached = cache.get(key);
  const [state, setState] = useState<State>(
    cached ? { status: 'ready', text: cached } : { status: 'loading' },
  );

  useEffect(() => {
    const hit = cache.get(key);
    if (hit) {
      setState({ status: 'ready', text: hit });
      return;
    }
    let cancelled = false;
    setState({ status: 'loading' });
    fetch(`${import.meta.env.BASE_URL}texts/${key}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json() as Promise<TextDoc>;
      })
      .then((text) => {
        cache.set(key, text);
        if (!cancelled) setState({ status: 'ready', text });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  if (state.status === 'loading') {
    return <div className="reader-status">Fetching the text…</div>;
  }
  if (state.status === 'error') {
    return <div className="reader-status">The text could not be loaded.</div>;
  }

  const { text } = state;
  return (
    <article className="reading">
      {text.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className="text-attribution">
        Translated by {text.translator} · {text.license} ·{' '}
        <a href={text.sourceUrl} target="_blank" rel="noreferrer">
          {text.source}
        </a>
      </div>
    </article>
  );
}
