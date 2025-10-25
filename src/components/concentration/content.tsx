import { useState } from 'react';
import { GameIntroduction } from '~/components/common/';
import { Cards } from './cards';

export const Content = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      <Cards />
      {!isPlaying && <GameIntroduction title="Concentration" startGame={startGame} />}
    </div>
  );
};
