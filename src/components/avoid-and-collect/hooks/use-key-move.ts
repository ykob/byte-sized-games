import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { moveCatcherLeftAtom, moveCatcherRightAtom } from '../store';

export const useKeyMove = () => {
  const moveCatcherLeft = useSetAtom(moveCatcherLeftAtom);
  const moveCatcherRight = useSetAtom(moveCatcherRightAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        moveCatcherLeft();
        return;
      }
      if (e.key === 'ArrowRight') {
        moveCatcherRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveCatcherLeft, moveCatcherRight]);
};
