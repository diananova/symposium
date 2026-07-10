import { useEffect, useState } from 'react';
import type { Book, CommentaryRef, Section } from './types';
import { emptyProgress, useProgress } from './progress';
import { Splash } from './components/Splash';
import { Tracker } from './components/Tracker';
import { SectionDetail } from './components/SectionDetail';
import { CommentaryView } from './components/CommentaryView';

type View =
  | { name: 'tracker' }
  | { name: 'section'; book: Book; section: Section }
  | { name: 'commentary'; book: Book; commentary: CommentaryRef };

export default function App() {
  const { progress, setStatus, setNotes, exportJson } = useProgress();
  const [view, setView] = useState<View>({ name: 'tracker' });
  const [showSplash, setShowSplash] = useState(true);

  // Splash fades out via CSS; unmount it after the animation ends.
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showSplash && <Splash />}
      {view.name === 'tracker' && (
        <Tracker
          progress={progress}
          onOpenSection={(book, section) => setView({ name: 'section', book, section })}
          onOpenCommentary={(book, commentary) => setView({ name: 'commentary', book, commentary })}
          onExport={exportJson}
        />
      )}
      {view.name === 'section' && (
        <SectionDetail
          book={view.book}
          section={view.section}
          progress={progress[view.section.id] ?? emptyProgress}
          onSetStatus={(status) => setStatus(view.section.id, status)}
          onSetNotes={(notes) => setNotes(view.section.id, notes)}
          onBack={() => setView({ name: 'tracker' })}
        />
      )}
      {view.name === 'commentary' && (
        <CommentaryView
          book={view.book}
          commentary={view.commentary}
          onBack={() => setView({ name: 'tracker' })}
        />
      )}
    </>
  );
}
