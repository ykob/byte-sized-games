import { useState } from 'react';
import { Introduction } from './introduction';
import { Moles } from './moles';
import { Timer } from './timer';
import { useTimerHook } from './use-timer-hook';

export const Content = () => {
  const { time, start } = useTimerHook();
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    start();
  };

  return (
    <div>
      <Timer time={time} />
      <Moles time={time} />
      {!isPlaying && <Introduction startGame={startGame} />}
    </div>
  );
};
