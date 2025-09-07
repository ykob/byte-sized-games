import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { GameOver } from './game-over';
import { Introduction } from './introduction';
import { Moles } from './moles';
import { getScoreAtom, resetGameAtom } from './store';
import { Timer } from './timer';
import { useTimerHook } from './use-timer-hook';

export const Content = () => {
  const limit = 60000;
  const {
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
    if (time >= limit) {
      setGameOver(true);
      stopTimer();
    }
  }, [time]);

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
