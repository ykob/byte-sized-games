import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useIsTimerExpired, useTimer } from '~/hooks';
import { isAllPiecesFittedAtom, onGameOverAtom, resetGameAtom, startGameAtom } from '../stores';
import { usePuzzleDrag } from './use-puzzle-drag';

export const useGameManager = () => {
  const limit = 60000;
  const { start: startTimer, pause: pauseTimer } = useTimer({
    limit,
  });
  const isTimerExpired = useIsTimerExpired();

  const onGameOver = useSetAtom(onGameOverAtom);

  usePuzzleDrag();

  useEffect(() => {
    if (isTimerExpired === true) {
      onGameOver();
    }
  }, [isTimerExpired, onGameOver]);

  const isAllPiecesFitted = useAtomValue(isAllPiecesFittedAtom);

  useEffect(() => {
    if (isAllPiecesFitted) {
      pauseTimer();
      onGameOver();
    }
  }, [isAllPiecesFitted, pauseTimer, onGameOver]);

  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);

  return {
    limit,
    handleStartGame: () => {
      startGame();
      startTimer();
    },
    handleRetryGame: () => {
      resetGame();
      startTimer();
    },
  };
};
