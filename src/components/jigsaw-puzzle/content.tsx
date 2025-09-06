import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Complete } from './complete';
import { PuzzleBoard } from './puzzle-board';
import { cursorPositionAtom, releasePieceAtom } from './store';
import { UnfittedPieces } from './unfitted-pieces';

export const Content = () => {
  const setCursorPosition = useSetAtom(cursorPositionAtom);
  const releasePiece = useSetAtom(releasePieceAtom);

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

  return (
    <div>
      <PuzzleBoard />
      <UnfittedPieces />
      <Complete />
    </div>
  );
};
