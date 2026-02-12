import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { releasePieceAtom, setCursorPositionAtom } from '~/components/games/jigsaw-puzzle/stores';

export const usePuzzleDrag = () => {
  const releasePiece = useSetAtom(releasePieceAtom);
  const setCursorPosition = useSetAtom(setCursorPositionAtom);

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

  useEffect(() => {
    const touchmove = (event: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];

      setCursorPosition({ x: clientX, y: clientY });
    };
    const touchend = (event: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = event instanceof MouseEvent ? event : event.changedTouches[0];
      const index = judgeFitPiece(clientX, clientY);

      releasePiece(index);
    };

    window.addEventListener('touchmove', touchmove);
    window.addEventListener('mousemove', touchmove);
    window.addEventListener('touchend', touchend);
    window.addEventListener('mouseup', touchend);

    return () => {
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('mousemove', touchmove);
      window.removeEventListener('touchend', touchend);
      window.removeEventListener('mouseup', touchend);
    };
  }, [releasePiece, setCursorPosition]);
};
