import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimer } from '~/hooks';
import { useIsTimerExpired } from '~/hooks/use-timer/store';
import { usePuzzleDrag } from './hooks/use-puzzle-drag';
import { PuzzleBoard } from './puzzle-board';
import { PuzzleCompletionWatcher } from './puzzle-completion-watcher';
import {
  getGameOverAtom,
  getIsPlayingAtom,
  onGameOverAtom,
  resetGameAtom,
  startGameAtom,
} from './stores';
import { Timer } from './timer';
import { UnfittedPieces } from './unfitted-pieces';

export const Content = () => {
  const limit = 60000;
  const { start: startTimer, pause: pauseTimer } = useTimer({
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
    if (gameOver) {
      pauseTimer();
    }
  }, [gameOver, pauseTimer]);

  useEffect(() => {
    if (isTimerExpired === true) {
      onGameOver();
      pauseTimer();
    }
  }, [isTimerExpired, onGameOver, pauseTimer]);

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
