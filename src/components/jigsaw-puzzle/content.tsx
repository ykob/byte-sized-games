import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { PuzzleBoard } from './puzzle-board';
import { cursorPositionAtom, hoverPieceAtom, releasePieceAtom } from './store';
import { UnfittedPieces } from './unfitted-pieces';

export const Content = () => {
  const setCursorPosition = useSetAtom(cursorPositionAtom);
  const releasePiece = useSetAtom(releasePieceAtom);
  const hoverPiece = useSetAtom(hoverPieceAtom);

  const judgeFitPiece = (x: number, y: number) => {
    const elements = document.elementsFromPoint(x, y);

    if (elements.length === 0) {
      return;
    }

    const element = elements.find((el) => el instanceof HTMLDivElement && el.dataset.pieceIndex);

    if (element && element instanceof HTMLDivElement && element.dataset.pieceIndex) {
      const index = parseInt(element.dataset.pieceIndex);

      hoverPiece(index);
    }
  };
  const touchmove = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent) {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      return;
    }
    setCursorPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  };
  const touchend = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent) {
      const { clientX, clientY } = event;
      judgeFitPiece(clientX, clientY);
      releasePiece();
      return;
    }
    const { clientX, clientY } = event.changedTouches[0];
    judgeFitPiece(clientX, clientY);
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
