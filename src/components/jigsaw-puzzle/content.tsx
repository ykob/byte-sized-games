import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimer } from '~/hooks';
import { useIsTimerExpired } from '~/hooks/use-timer/store';
import { PuzzleBoard } from './puzzle-board';
import {
  getGameOverAtom,
  getIsPlayingAtom,
  onGameOverAtom,
  releasePieceAtom,
  resetGameAtom,
  setCursorPositionAtom,
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

  const releasePiece = useSetAtom(releasePieceAtom);
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const setCursorPosition = useSetAtom(setCursorPositionAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  const judgeFitPiece = (x: number, y: number) => {
    const elements = document.elementsFromPoint(x, y);

    if (elements.length === 0) {
      return -1;
    }

    const element = elements.find((el) => el instanceof HTMLDivElement && el.dataset.pieceIndex);

    if (element && element instanceof HTMLDivElement && element.dataset.pieceIndex) {
      return parseInt(element.dataset.pieceIndex);
    }
    return -1;
  };
  const touchmove = (event: MouseEvent | TouchEvent) => {
    const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];

    setCursorPosition({ x: clientX, y: clientY });
  };
  const touchend = (event: MouseEvent | TouchEvent) => {
    const { clientX, clientY } = event instanceof MouseEvent ? event : event.changedTouches[0];
    const index = judgeFitPiece(clientX, clientY);

    releasePiece(index);
  };

  useEffect(() => {
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('mousemove', touchmove);
    window.addEventListener('touchend', touchend);
    window.addEventListener('mouseup', touchend);
  }, []);

  useEffect(() => {
    if (gameOver) {
      pauseTimer();
    }
  }, [gameOver]);

  useEffect(() => {
    if (isTimerExpired === true) {
      onGameOver();
      pauseTimer();
    }
  }, [isTimerExpired]);

  return (
    <div>
      <PuzzleBoard />
      <UnfittedPieces />
      <Timer limit={limit} />
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
