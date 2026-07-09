import { useEffect, useState } from 'react';
import type { Book, Section } from './types';
import { emptyProgress, useProgress } from './progress';
import { Splash } from './components/Splash';
import { Tracker } from './components/Tracker';
import { SectionDetail } from './components/SectionDetail';

type View = { name: 'tracker' } | { name: 'section'; book: Book; section: Section };

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
      {view.name === 'tracker' ? (
        <Tracker
          progress={progress}
          onOpenSection={(book, section) => setView({ name: 'section', book, section })}
          onExport={exportJson}
        />
      ) : (
        <SectionDetail
          book={view.book}
          section={view.section}
          progress={progress[view.section.id] ?? emptyProgress}
          onSetStatus={(status) => setStatus(view.section.id, status)}
          onSetNotes={(notes) => setNotes(view.section.id, notes)}
          onBack={() => setView({ name: 'tracker' })}
        />
      )}
    </>
  );
}
