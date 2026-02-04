import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimer } from '~/hooks/';
import { useIsTimerExpired } from '~/hooks/use-timer/store';
import { Moles } from './moles';
import {
  getGameOverAtom,
  getIsPlayingAtom,
  getScoreAtom,
  onGameOverAtom,
  resetGameAtom,
  startGameAtom,
} from './stores';
import { Timer } from './timer';

export const Content = () => {
  const limit = 30000;
  const { start: startTimer } = useTimer({
    limit,
  });
  const isTimerExpired = useIsTimerExpired();
  const score = useAtomValue(getScoreAtom);
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (isTimerExpired === true) {
      onGameOver();
    }
  }, [isTimerExpired, onGameOver]);

  return (
    <div>
      <Timer />
      <div>{score}</div>
      <Moles />
      {!isPlaying && (
        <GameIntroduction
          title="Whac a Mole"
          startGame={() => {
            startGame();
            startTimer();
          }}
        />
      )}
      {gameOver && (
        <GameOver
          retryGame={() => {
            resetGame();
            startTimer();
          }}
        />
      )}
    </div>
  );
};
