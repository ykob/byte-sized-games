import { atom } from 'jotai';
import type { Piece } from './type';

const basePieces: Piece[] = Array.from({ length: 9 }, (_, i) => {
  return {
    index: i,
    x: Math.random(),
    y: Math.random(),
    fitted: false,
  };
});

export const puzzleBoardAtom = atom<HTMLElement | null>(null);
export const isGrabbingAtom = atom(false);
export const cursorPositionAtom = atom({ x: 0, y: 0 });

const piecesAtom = atom<Piece[]>(basePieces);
const grabIndexAtom = atom(-1);

// Getter
export const getPiecesAtom = atom((get) => get(piecesAtom));
export const getGrabIndexAtom = atom((get) => get(grabIndexAtom));

// Setter
export const grabPieceAtom = atom(null, (get, set, index: number) => {
  const isGrabbing = get(isGrabbingAtom);

  if (isGrabbing) return;

  set(isGrabbingAtom, true);
  set(grabIndexAtom, index);
});

export const releasePieceAtom = atom(null, (get, set, index: number) => {
  const isGrabbing = get(isGrabbingAtom);
  const grabIndex = get(grabIndexAtom);
  const pieces = get(piecesAtom);

  if (!isGrabbing) return;

  if (index === grabIndex) {
    const newPieces = pieces.map((piece) => {
      if (piece.index === grabIndex) {
        return {
          ...piece,
          fitted: true,
        };
      }
      return piece;
    });
    set(piecesAtom, newPieces);
  }

  set(isGrabbingAtom, false);
  set(grabIndexAtom, -1);
});
