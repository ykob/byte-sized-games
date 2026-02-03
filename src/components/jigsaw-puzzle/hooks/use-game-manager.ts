import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useIsTimerExpired, useTimer } from '~/hooks';
import { isAllPiecesFittedAtom, onGameOverAtom, resetGameAtom, startGameAtom } from '../stores';

export const useGameManager = () => {
  // Expired timer.
  const isTimerExpired = useIsTimerExpired();
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (isTimerExpired === true) {
      onGameOver();
    }
  }, [isTimerExpired, onGameOver]);

  // Is all pieces fitted.
  const isAllPiecesFitted = useAtomValue(isAllPiecesFittedAtom);
  const limit = 60000;
  const { start: startTimer, pause: pauseTimer } = useTimer({
    limit,
  });

  useEffect(() => {
    if (isAllPiecesFitted) {
      pauseTimer();
      onGameOver();
    }
  }, [isAllPiecesFitted, pauseTimer, onGameOver]);

  // Handlers
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const handleStartGame = () => {
    startGame();
    startTimer();
  };
  const handleRetryGame = () => {
    resetGame();
    startTimer();
  };

  return {
    limit,
    handleStartGame,
    handleRetryGame,
  };
};
