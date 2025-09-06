import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { PuzzleBoard } from './puzzle-board';
import { cursorPositionAtom, releasePieceAtom } from './store';
import type { Piece } from './type';
import { UnfittedPieces } from './unfitted-pieces';

const basePieces: Piece[] = Array.from({ length: 9 }, (_, i) => {
  return {
    index: i,
    x: Math.random(),
    y: Math.random(),
    fitted: false,
  };
});

export const Content = () => {
  const [pieces] = useState(basePieces);
  const setCursorPosition = useSetAtom(cursorPositionAtom);
  const releasePiece = useSetAtom(releasePieceAtom);

  const move = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent) {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      return;
    }
    setCursorPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  };

  useEffect(() => {
    window.addEventListener('touchmove', move);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchend', releasePiece);
    window.addEventListener('mouseup', releasePiece);
  }, []);

  return (
    <div>
      <PuzzleBoard pieces={pieces} />
      <UnfittedPieces pieces={pieces} />
    </div>
  );
};
