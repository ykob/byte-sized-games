import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { Cards } from './cards';
import { getGameOverAtom, resetGameAtom } from './stores';

export const Content = () => {
  const gameOver = useAtomValue(getGameOverAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
  };
  const retryGame = () => {
    resetGame();
  };

  return (
    <div>
      <Cards />
      {!isPlaying && <GameIntroduction title="Concentration" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
