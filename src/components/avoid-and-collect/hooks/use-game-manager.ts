import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useTimer } from '~/hooks';
import {
  getGameOverAtom,
  getIsPlayingAtom,
  getLifeAtom,
  onGameOverAtom,
  resetGameAtom,
  startGameAtom,
  updateFallingItemsAtom,
} from '../stores';

export const useGameManager = () => {
  const updateFallingItems = useSetAtom(updateFallingItemsAtom);
  const {
    start: startTimer,
    stop: stopTimer,
    pause: pauseTimer,
    play: playTimer,
  } = useTimer({
    update: updateFallingItems,
  });

  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);

  // Visibility API handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isPlaying || gameOver) return;

      if (document.visibilityState === 'hidden') {
        pauseTimer();
      } else {
        playTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gameOver, isPlaying, pauseTimer, playTimer]);

  // Game over handling
  const life = useAtomValue(getLifeAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (life <= 0) {
      onGameOver();
      stopTimer();
    }
  }, [life, onGameOver, stopTimer]);

  return {
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
