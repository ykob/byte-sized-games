import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimer } from '~/hooks';
import { Catcher } from './catcher';
import { FallingItems } from './falling-items';
import { LifeView } from './life-view';
import { MoveButtons } from './move-buttons';
import { ScoreView } from './score-view';
import {
  getGameOverAtom,
  getIsPlayingAtom,
  getLifeAtom,
  onGameOverAtom,
  resetGameAtom,
  startGameAtom,
  updateFallingItemsAtom,
} from './store';

export const Content = () => {
  const updateFallingItems = useSetAtom(updateFallingItemsAtom);
  const {
    start: startTimer,
    stop: stopTimer,
    pause: pauseTimer,
    play: playTimer,
  } = useTimer({
    update: updateFallingItems,
  });
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isPlaying || gameOver) return;

      if (document.visibilityState === 'hidden') {
        pauseTimer();
      } else {
        playTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gameOver, isPlaying, pauseTimer, playTimer]);

  const life = useAtomValue(getLifeAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (life <= 0) {
      onGameOver();
      stopTimer();
    }
  }, [life, onGameOver, stopTimer]);

  return (
    <div>
      <LifeView />
      <ScoreView />
      <FallingItems />
      <Catcher />
      <MoveButtons />
      {!isPlaying && (
        <GameIntroduction
          title="Avoid & Collect"
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
