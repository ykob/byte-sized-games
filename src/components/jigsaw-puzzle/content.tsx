import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { PuzzleBoard } from './puzzle-board';
import { cursorPositionAtom, releasePieceAtom } from './store';
import { UnfittedPieces } from './unfitted-pieces';

export const Content = () => {
  const setCursorPosition = useSetAtom(cursorPositionAtom);
  const releasePiece = useSetAtom(releasePieceAtom);

  const touchmove = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent) {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      return;
    }
    setCursorPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  };
  const touchend = () => {
    releasePiece();
  };

  useEffect(() => {
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('mousemove', touchmove);
    window.addEventListener('touchend', touchend);
    window.addEventListener('mouseup', touchend);
  }, []);

  return (
    <div>
      <PuzzleBoard />
      <UnfittedPieces />
    </div>
  );
};
