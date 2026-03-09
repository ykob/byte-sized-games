import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useIsTimerExpired } from '~/hooks/use-timer/store';
import { useGameManager } from './hooks';
import { getGameOverAtom, getIsPlayingAtom, getScoreAtom, onGameOverAtom } from './stores';
import { Moles, Timer } from './ui';

export const Content = () => {
  const { handleStartGame, handleResetGame } = useGameManager();
  const isTimerExpired = useIsTimerExpired();
  const score = useAtomValue(getScoreAtom);
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
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
      {!isPlaying && <GameIntroduction title="Whac a Mole" startGame={handleStartGame} />}
      {gameOver && <GameOver retryGame={handleResetGame} />}
    </div>
  );
};
