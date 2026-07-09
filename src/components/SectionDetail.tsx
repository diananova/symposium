import type { Book, Section, SectionProgress, SectionStatus } from '../types';
import { Kylix } from './Kylix';

interface SectionDetailProps {
  book: Book;
  section: Section;
  progress: SectionProgress;
  onSetStatus: (status: SectionStatus) => void;
  onSetNotes: (notes: string) => void;
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
  onSetStatus,
  onSetNotes,
  onBack,
}: SectionDetailProps) {
  return (
    <>
      <button className="back-btn" onClick={onBack}>
        ‹ Curriculum
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
