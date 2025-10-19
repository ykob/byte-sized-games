import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimerHook } from '~/hooks';
import { PuzzleBoard } from './puzzle-board';
import {
  cursorPositionAtom,
  getGameOverAtom,
  releasePieceAtom,
  resetGameAtom,
  setGameOverAtom,
} from './store';
import { Timer } from './timer';
import { UnfittedPieces } from './unfitted-pieces';

export const Content = () => {
  const limit = 30000;
  const {
    isExpired,
    time,
    start: startTimer,
    pause: pauseTimer,
  } = useTimerHook({
    limit,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const gameOver = useAtomValue(getGameOverAtom);
  const releasePiece = useSetAtom(releasePieceAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const setCursorPosition = useSetAtom(cursorPositionAtom);
  const setGameOver = useSetAtom(setGameOverAtom);

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
  const startGame = () => {
    setIsPlaying(true);
    startTimer();
  };
  const retryGame = () => {
    resetGame();
    startTimer();
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
    if (isExpired.current === true) {
      setGameOver(true);
      pauseTimer();
    }
  }, [isExpired.current]);

  return (
    <div>
      <PuzzleBoard />
      <UnfittedPieces />
      <Timer time={limit - time} />
      {!isPlaying && <GameIntroduction title="Jigsaw Puzzle" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
