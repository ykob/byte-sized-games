import { useSetAtom } from 'jotai';
import { useTimer } from '~/hooks/';
import {
  resetGameAtom,
  startGameAtom,
} from '../stores';

export const useGameManager = () => {
  const limit = 30000;
  const { start: startTimer } = useTimer({
    limit,
  });
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);

  const handleStartGame = () => {
    startGame();
    startTimer();
  };

  const handleResetGame = () => {
    resetGame();
    startTimer();
  };

  return {
    handleStartGame,
    handleResetGame,
  };
};
