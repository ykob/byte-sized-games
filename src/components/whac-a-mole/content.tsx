import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimer } from '~/hooks/';
import { Moles } from './moles';
import { getScoreAtom, resetGameAtom } from './store';
import { Timer } from './timer';

export const Content = () => {
  const limit = 30000;
  const {
    isExpired,
    time,
    start: startTimer,
    stop: stopTimer,
  } = useTimer({
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
      {!isPlaying && <GameIntroduction title="Whac a Mole" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
