import type { Book, CommentaryRef, ProgressMap, Section, Track } from '../types';
import { sectionFraction, statusOf } from '../progress';
import { Kylix } from './Kylix';

interface BookViewProps {
  track: Track;
  book: Book;
  progress: ProgressMap;
  onOpenSection: (section: Section) => void;
  onOpenCommentary: (commentary: CommentaryRef) => void;
  onBack: () => void;
}

export function BookView({
  track,
  book,
  progress,
  onOpenSection,
  onOpenCommentary,
  onBack,
}: BookViewProps) {
  const total = book.sections.length;
  const done = book.sections.filter((s) => statusOf(progress, s) === 'completed').length;

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        ‹ Curriculum
      </button>

      <div className="crumb">
        {track.name} · {book.author}
      </div>
      <div className="book-title-row">
        <h1 className="passage-title">{book.title}</h1>
        <Kylix
          size={46}
          fraction={total ? done / total : 0}
          olive={total > 0 && done === total}
          label={`${done} of ${total} sections complete`}
        />
      </div>
      {book.edition && <div className="book-edition">Edition: {book.edition}</div>}

      <div className="section-list">
        {book.sections.map((section) => {
          const status = statusOf(progress, section);
          const rowClass = status === 'completed' ? ' done' : status === 'in_progress' ? ' active' : '';
          return (
            <button key={section.id} className={`item${rowClass}`} onClick={() => onOpenSection(section)}>
              <div className="item-ring">
                <Kylix
                  size={30}
                  fraction={sectionFraction(status)}
                  olive={status === 'completed'}
                  center={false}
                />
              </div>
              <div className="item-text">
                <div className="item-title">{section.title}</div>
                <div className="item-sub">
                  {status === 'completed' && <span className="status-complete">Complete</span>}
                  {status === 'in_progress' && <span className="status-active">In progress</span>}
                  {status === 'not_started' && <span>Not started</span>}
                  {section.meta?.cite && <> · {section.meta.cite}</>}
                  {section.meta?.estLength && <> · {section.meta.estLength}</>}
                </div>
              </div>
              <span className="item-chevron" aria-hidden="true">
                ›
              </span>
            </button>
          );
        })}
        {book.commentary?.map((c) => (
          <button key={c.id} className="item item-commentary" onClick={() => onOpenCommentary(c)}>
            <div className="item-ring commentary-mark" aria-hidden="true">
              §
            </div>
            <div className="item-text">
              <div className="item-title">{c.title}</div>
              <div className="item-sub">
                <span className="status-interp">Interpretation</span> · not the text
              </div>
            </div>
            <span className="item-chevron" aria-hidden="true">
              ›
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
