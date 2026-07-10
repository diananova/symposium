import { curriculum } from '../data/curriculum';
import type { Book, ProgressMap, Track, Year } from '../types';
import { statusOf } from '../progress';
import { Kylix } from './Kylix';

interface TrackerProps {
  progress: ProgressMap;
  year: Year;
  track: Track | undefined;
  onSelectYear: (year: Year) => void;
  onSelectTrack: (track: Track) => void;
  onOpenBook: (book: Book) => void;
  onExport: () => void;
}

export function Tracker({
  progress,
  year,
  track,
  onSelectYear,
  onSelectTrack,
  onOpenBook,
  onExport,
}: TrackerProps) {
  const allSections = year.tracks.flatMap((t) => t.books.flatMap((b) => b.sections));
  const completed = allSections.filter((s) => statusOf(progress, s) === 'completed').length;
  const overall = allSections.length ? completed / allSections.length : 0;

  return (
    <>
      <header className="top-row">
        <div>
          <h1 className="wordmark">Symposium</h1>
          <div className="tagline">Studia Humanitatis</div>
        </div>
        <div title={`${completed} of ${allSections.length} sections complete`}>
          <Kylix size={46} fraction={overall} label={`Overall progress: ${completed} of ${allSections.length} sections`} />
        </div>
      </header>

      <nav className="year-tabs" aria-label="Year">
        {curriculum.years.map((y) => (
          <button
            key={y.id}
            className={`year-tab${y.id === year.id ? ' active' : ''}`}
            onClick={() => onSelectYear(y)}
          >
            {y.label}
          </button>
        ))}
      </nav>

      <nav className="track-row" aria-label="Track">
        {year.tracks.map((t) => (
          <button
            key={t.id}
            className={`track-chip${t.id === track?.id ? ' active' : ''}`}
            onClick={() => onSelectTrack(t)}
          >
            {t.name}
          </button>
        ))}
      </nav>

      {year.tracks.length === 0 && (
        <p className="empty-note">
          The {year.name} reading list hasn’t been added yet — Year 1 is fully seeded.
        </p>
      )}

      {track && track.books.length > 0 && (
        <>
          <div className="order-note">In reading order</div>
          <div className="book-grid">
            {track.books.map((book, i) => {
              const total = book.sections.length;
              const done = book.sections.filter((s) => statusOf(progress, s) === 'completed').length;
              const started = book.sections.some((s) => statusOf(progress, s) !== 'not_started');
              const finished = total > 0 && done === total;
              const cardClass = finished ? ' done' : started ? ' active' : '';
              return (
                <button
                  key={book.id}
                  className={`book-card${cardClass}`}
                  onClick={() => onOpenBook(book)}
                >
                  <div className="book-card-top">
                    <span className="book-card-num">{String(i + 1).padStart(2, '0')}</span>
                    <Kylix
                      size={30}
                      fraction={total ? done / total : 0}
                      olive={finished}
                      center={false}
                      label={`${book.title}: ${done} of ${total} sections complete`}
                    />
                  </div>
                  <div className="book-card-title">{book.title}</div>
                  <div className="book-card-author">{book.author}</div>
                  <div className="book-card-meta">
                    {done > 0 ? `${done} / ${total} sections` : `${total} section${total === 1 ? '' : 's'}`}
                    {book.commentary && book.commentary.length > 0 && ' · §'}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      <footer className="footer">
        <span className="footer-note">
          {completed} / {allSections.length} sections
        </span>
        <button className="export-btn" onClick={onExport}>
          Export progress (JSON)
        </button>
      </footer>
    </>
  );
}
