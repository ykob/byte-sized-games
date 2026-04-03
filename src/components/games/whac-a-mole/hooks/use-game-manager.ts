import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useIsTimerExpired, useTimer } from '~/hooks/';
import {
  getIsPlayingAtom,
  getLifeAtom,
  onGameOverAtom,
  resetGameAtom,
  startGameAtom,
} from '../stores';

export const useGameManager = () => {
  const GAME_DURATION_MS = 30000;
  const { start: startTimer, stop: stopTimer } = useTimer({
    limit: GAME_DURATION_MS,
  });
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const isTimerExpired = useIsTimerExpired();

  const handleStartGame = () => {
    startGame();
    startTimer();
  };

  const handleResetGame = () => {
    resetGame();
    startTimer();
  };

  // Game over handling
  const life = useAtomValue(getLifeAtom);
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (isPlaying && (isTimerExpired || life <= 0)) {
      onGameOver();
      stopTimer();
    }
  }, [isPlaying, isTimerExpired, life, onGameOver, stopTimer]);

  return {
    handleStartGame,
    handleResetGame,
  };
};
