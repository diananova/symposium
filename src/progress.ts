import { useCallback, useMemo, useState } from 'react';
import type { ProgressMap, SectionStatus } from './types';
import { applyUpdate, createLocalStorageStore } from './lib/progressStore';

export { emptyProgress, sectionFraction, statusOf } from './lib/progressStore';

export function useProgress() {
  const store = useMemo(() => createLocalStorageStore(window.localStorage), []);
  const [progress, setProgress] = useState<ProgressMap>(() => store.load());

  const update = useCallback(
    (sectionId: string, patch: Parameters<typeof applyUpdate>[2]) => {
      setProgress((prev) => {
        const next = applyUpdate(prev, sectionId, patch);
        store.save(next);
        return next;
      });
    },
    [store],
  );

  const setStatus = useCallback(
    (sectionId: string, status: SectionStatus) => update(sectionId, { status }),
    [update],
  );

  const setNotes = useCallback(
    (sectionId: string, notes: string) => update(sectionId, { notes }),
    [update],
  );

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symposium-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [progress]);

  return { progress, setStatus, setNotes, exportJson };
}
