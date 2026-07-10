import { useState } from 'react';
import { curriculum } from '../data/curriculum';
import type { Book, ProgressMap, Section, SectionStatus } from '../types';
import { emptyProgress } from '../progress';
import { Kylix } from './Kylix';

interface TrackerProps {
  progress: ProgressMap;
  onOpenSection: (book: Book, section: Section) => void;
  onExport: () => void;
}

function statusOf(progress: ProgressMap, section: Section): SectionStatus {
  return (progress[section.id] ?? emptyProgress).status;
}

function sectionFraction(status: SectionStatus): number {
  if (status === 'completed') return 1;
  if (status === 'in_progress') return 0.4;
  return 0;
}

export function Tracker({ progress, onOpenSection, onExport }: TrackerProps) {
  const [yearId, setYearId] = useState('year-1');
  const year = curriculum.years.find((y) => y.id === yearId) ?? curriculum.years[0];
  const [trackId, setTrackId] = useState(year.tracks[0]?.id ?? '');
  const track = year.tracks.find((t) => t.id === trackId) ?? year.tracks[0];

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
            onClick={() => {
              setYearId(y.id);
              setTrackId(y.tracks[0]?.id ?? '');
            }}
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
            onClick={() => setTrackId(t.id)}
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

      {track?.books.map((book) => (
        <section key={book.id}>
          <h2 className="book-header">
            {book.title} — {book.author}
          </h2>
          {book.edition && <div className="book-edition">Edition: {book.edition}</div>}
          {book.sections.map((section) => {
              const status = statusOf(progress, section);
              const rowClass =
                status === 'completed' ? ' done' : status === 'in_progress' ? ' active' : '';
              return (
                <button
                  key={section.id}
                  className={`item${rowClass}`}
                  onClick={() => onOpenSection(book, section)}
                >
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
        </section>
      ))}

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
