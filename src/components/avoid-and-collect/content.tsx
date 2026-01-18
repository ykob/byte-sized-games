import { useState } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';

export const Content = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
  };
  const retryGame = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      {!isPlaying && <GameIntroduction title="Avoid & Collect" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
