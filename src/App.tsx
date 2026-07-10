import { useEffect, useState } from 'react';
import type { Book, CommentaryRef, Section, Track } from './types';
import { emptyProgress, useProgress } from './progress';
import { Splash } from './components/Splash';
import { Tracker } from './components/Tracker';
import { BookView } from './components/BookView';
import { SectionDetail } from './components/SectionDetail';
import { CommentaryView } from './components/CommentaryView';

type View =
  | { name: 'tracker' }
  | { name: 'book'; track: Track; book: Book }
  | { name: 'section'; track: Track; book: Book; section: Section }
  | { name: 'commentary'; track: Track; book: Book; commentary: CommentaryRef };

export default function App() {
  const { progress, setStatus, setNotes, exportJson } = useProgress();
  const [view, setView] = useState<View>({ name: 'tracker' });
  const [showSplash, setShowSplash] = useState(true);

  // Splash fades out via CSS; unmount it after the animation ends.
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <>
      {showSplash && <Splash />}
      {view.name === 'tracker' && (
        <Tracker
          progress={progress}
          onOpenBook={(track, book) => setView({ name: 'book', track, book })}
          onExport={exportJson}
        />
      )}
      {view.name === 'book' && (
        <BookView
          track={view.track}
          book={view.book}
          progress={progress}
          onOpenSection={(section) => setView({ ...view, name: 'section', section })}
          onOpenCommentary={(commentary) => setView({ ...view, name: 'commentary', commentary })}
          onBack={() => setView({ name: 'tracker' })}
        />
      )}
      {view.name === 'section' && (
        <SectionDetail
          book={view.book}
          section={view.section}
          progress={progress[view.section.id] ?? emptyProgress}
          onSetStatus={(status) => setStatus(view.section.id, status)}
          onSetNotes={(notes) => setNotes(view.section.id, notes)}
          onBack={() => setView({ name: 'book', track: view.track, book: view.book })}
        />
      )}
      {view.name === 'commentary' && (
        <CommentaryView
          book={view.book}
          commentary={view.commentary}
          onBack={() => setView({ name: 'book', track: view.track, book: view.book })}
        />
      )}
    </>
  );
}
