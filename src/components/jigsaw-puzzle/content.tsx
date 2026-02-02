import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useIsTimerExpired, useTimer } from '~/hooks';
import { usePuzzleDrag } from './hooks/';
import { PuzzleCompletionWatcher } from './puzzle-completion-watcher';
import {
  getGameOverAtom,
  getIsPlayingAtom,
  onGameOverAtom,
  resetGameAtom,
  startGameAtom,
} from './stores';
import { PuzzleBoard, Timer, UnfittedPieces } from './ui';

export const Content = () => {
  const limit = 60000;
  const { start: startTimer } = useTimer({
    limit,
  });
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const isTimerExpired = useIsTimerExpired();

  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  usePuzzleDrag();

  useEffect(() => {
    if (isTimerExpired === true) {
      onGameOver();
    }
  }, [isTimerExpired, onGameOver]);

  return (
    <div>
      <PuzzleBoard />
      <UnfittedPieces />
      <Timer limit={limit} />
      <PuzzleCompletionWatcher />
      {!isPlaying && (
        <GameIntroduction
          title="Jigsaw Puzzle"
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
