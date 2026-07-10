import type { Book, CommentaryRef } from '../types';
import { Reader } from './Reader';

interface CommentaryViewProps {
  book: Book;
  commentary: CommentaryRef;
  onBack: () => void;
}

export function CommentaryView({ book, commentary, onBack }: CommentaryViewProps) {
  return (
    <>
      <button className="back-btn" onClick={onBack}>
        ‹ Curriculum
      </button>

      <div className="crumb">
        {book.title} · {book.author}
      </div>
      <h1 className="passage-title">{commentary.title}</h1>

      <div className="interp-banner">
        Interpretation — this is the translator’s commentary, not the text itself. The company
        speaks best after you have read and thought for yourself.
      </div>

      <Reader bookId={book.id} docId={commentary.id} />
    </>
  );
}
