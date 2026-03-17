import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common';
import { useIsTimerExpired } from '~/hooks/use-timer/store';
import { useGameManager } from './hooks';
import { getGameOverAtom, getIsPlayingAtom, onGameOverAtom } from './stores';
import { FinalScore, Moles, ScoreView, Timer } from './ui';

export const Content = () => {
  const { handleStartGame, handleResetGame } = useGameManager();
  const isTimerExpired = useIsTimerExpired();
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
      <ScoreView />
      <Moles />
      {!isPlaying && <GameIntroduction title="Whac a Mole" startGame={handleStartGame} />}
      {gameOver && <GameOver content={<FinalScore />} retryGame={handleResetGame} />}
    </div>
  );
};
