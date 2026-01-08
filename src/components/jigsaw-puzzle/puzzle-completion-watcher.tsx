import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { isAllPiecesFittedAtom, onGameOverAtom } from './stores';

export const PuzzleCompletionWatcher = () => {
  const isAllPiecesFitted = useAtomValue(isAllPiecesFittedAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (isAllPiecesFitted) {
      onGameOver();
    }
  }, [isAllPiecesFitted, onGameOver]);

  return null;
};
