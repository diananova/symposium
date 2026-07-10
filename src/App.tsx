import { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { curriculum } from './data/curriculum';
import { findBook, findCommentary, findSection, findYear } from './data/lookup';
import { emptyProgress, useProgress } from './progress';
import { useAnswers } from './answers';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Splash } from './components/Splash';
import { Tracker } from './components/Tracker';
import { BookView } from './components/BookView';
import { SectionDetail } from './components/SectionDetail';
import { CommentaryView } from './components/CommentaryView';

type ProgressApi = ReturnType<typeof useProgress>;
type AnswersApi = ReturnType<typeof useAnswers>;

function TrackerRoute({ progressApi }: { progressApi: ProgressApi }) {
  const { yearId, trackId } = useParams();
  const navigate = useNavigate();

  const year = findYear(yearId) ?? curriculum.years[0];
  const track = year.tracks.find((t) => t.id === trackId) ?? year.tracks[0];

  return (
    <Tracker
      progress={progressApi.progress}
      year={year}
      track={track}
      onSelectYear={(y) => navigate(`/${y.id}/${y.tracks[0]?.id ?? ''}`)}
      onSelectTrack={(t) => navigate(`/${year.id}/${t.id}`)}
      onOpenBook={(book) => navigate(`/book/${book.id}`)}
      onExport={progressApi.exportJson}
    />
  );
}

function BookRoute({ progressApi }: { progressApi: ProgressApi }) {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const ctx = findBook(bookId);
  if (!ctx) return <Navigate to="/" replace />;

  return (
    <BookView
      track={ctx.track}
      book={ctx.book}
      progress={progressApi.progress}
      onOpenSection={(section) => navigate(`/book/${ctx.book.id}/read/${section.id}`)}
      onOpenCommentary={(commentary) => navigate(`/book/${ctx.book.id}/read/${commentary.id}`)}
      onBack={() => navigate(`/${ctx.year.id}/${ctx.track.id}`)}
    />
  );
}

function DocRoute({ progressApi, answersApi }: { progressApi: ProgressApi; answersApi: AnswersApi }) {
  const { bookId, docId } = useParams();
  const navigate = useNavigate();
  const ctx = findBook(bookId);
  if (!ctx) return <Navigate to="/" replace />;

  const section = findSection(ctx.book, docId);
  if (section) {
    return (
      <SectionDetail
        book={ctx.book}
        section={section}
        progress={progressApi.progress[section.id] ?? emptyProgress}
        answers={answersApi.answers}
        onSetStatus={(status) => progressApi.setStatus(section.id, status)}
        onSetNotes={(notes) => progressApi.setNotes(section.id, notes)}
        onAnswerFactual={answersApi.answerFactual}
        onSubmitOpenAnswer={answersApi.submitOpenAnswer}
        onBack={() => navigate(`/book/${ctx.book.id}`)}
      />
    );
  }

  const commentary = findCommentary(ctx.book, docId);
  if (commentary) {
    return (
      <CommentaryView
        book={ctx.book}
        commentary={commentary}
        onBack={() => navigate(`/book/${ctx.book.id}`)}
      />
    );
  }

  return <Navigate to={`/book/${ctx.book.id}`} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const progressApi = useProgress();
  const answersApi = useAnswers();
  const [showSplash, setShowSplash] = useState(true);

  // Splash fades out via CSS; unmount it after the animation ends.
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <ErrorBoundary>
      {showSplash && <Splash />}
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<TrackerRoute progressApi={progressApi} />} />
          <Route path="/:yearId/:trackId?" element={<TrackerRoute progressApi={progressApi} />} />
          <Route path="/book/:bookId" element={<BookRoute progressApi={progressApi} />} />
          <Route
            path="/book/:bookId/read/:docId"
            element={<DocRoute progressApi={progressApi} answersApi={answersApi} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}
