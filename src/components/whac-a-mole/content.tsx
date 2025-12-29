import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimer } from '~/hooks/';
import { useIsTimerExpired } from '~/hooks/use-timer/store';
import { Moles } from './moles';
import { getScoreAtom, resetGameAtom } from './store';
import { Timer } from './timer';

export const Content = () => {
  const limit = 30000;
  const { start: startTimer, stop: stopTimer } = useTimer({
    limit,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const score = useAtomValue(getScoreAtom);
  const isTimerExpired = useIsTimerExpired();
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
    if (isTimerExpired === true) {
      setGameOver(true);
      stopTimer();
    }
  }, [isTimerExpired]);

  return (
    <div>
      <Timer />
      <div>{score}</div>
      <Moles />
      {!isPlaying && <GameIntroduction title="Whac a Mole" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
