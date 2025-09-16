import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Timer } from '~/components/common/';
import { useTimerHook } from '~/hooks/use-timer-hook';
import { GameOver } from './game-over';
import { Introduction } from './introduction';
import { Moles } from './moles';
import { getScoreAtom, resetGameAtom } from './store';

export const Content = () => {
  const limit = 30000;
  const {
    isExpired,
    time,
    start: startTimer,
    stop: stopTimer,
  } = useTimerHook({
    limit,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const score = useAtomValue(getScoreAtom);
  const resetGame = useSetAtom(resetGameAtom);

  const startGame = () => {
    setIsPlaying(true);
    startTimer();
  };
  const retryGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    resetGame();
    startTimer();
  };

  useEffect(() => {
    if (isExpired.current === true) {
      setGameOver(true);
      stopTimer();
    }
  }, [isExpired.current]);

  return (
    <div>
      <Timer time={time} />
      <div>{score}</div>
      <Moles time={time} />
      {!isPlaying && <Introduction startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
