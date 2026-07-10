import { useCallback, useEffect, useState } from 'react';
import type { ProgressMap, Section, SectionProgress, SectionStatus } from './types';

const STORAGE_KEY = 'symposium.progress.v1';

function load(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export const emptyProgress: SectionProgress = {
  status: 'not_started',
  notes: '',
  updatedAt: '',
};

export function statusOf(progress: ProgressMap, section: Section): SectionStatus {
  return (progress[section.id] ?? emptyProgress).status;
}

/** How full a section's kylix is drawn for a given status. */
export function sectionFraction(status: SectionStatus): number {
  if (status === 'completed') return 1;
  if (status === 'in_progress') return 0.4;
  return 0;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const update = useCallback(
    (sectionId: string, patch: Partial<Pick<SectionProgress, 'status' | 'notes'>>) => {
      setProgress((prev) => {
        const current = prev[sectionId] ?? emptyProgress;
        return {
          ...prev,
          [sectionId]: { ...current, ...patch, updatedAt: new Date().toISOString() },
        };
      });
    },
    [],
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
