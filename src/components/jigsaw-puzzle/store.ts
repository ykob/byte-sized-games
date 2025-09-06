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
const piecesAtom = atom<Piece[]>(basePieces);
export const isGrabbingAtom = atom(false);
export const cursorPositionAtom = atom({ x: 0, y: 0 });
const grabIndexAtom = atom(-1);
const hoveredIndexAtom = atom(-1);

export const getPiecesAtom = atom((get) => get(piecesAtom));
export const getGrabIndexAtom = atom((get) => get(grabIndexAtom));

export const grabPieceAtom = atom(null, (get, set, index: number) => {
  const isGrabbing = get(isGrabbingAtom);

  if (isGrabbing) return;

  set(isGrabbingAtom, true);
  set(grabIndexAtom, index);
});

export const hoverPieceAtom = atom(null, (get, set, index: number) => {
  console.log(index);
  const isGrabbing = get(isGrabbingAtom);

  if (!isGrabbing) return;

  set(hoveredIndexAtom, index);
});

export const unhoverPieceAtom = atom(null, (get, set) => {
  const isGrabbing = get(isGrabbingAtom);

  if (!isGrabbing) return;

  set(hoveredIndexAtom, -1);
});

export const releasePieceAtom = atom(null, (get, set) => {
  const isGrabbing = get(isGrabbingAtom);
  const grabIndex = get(grabIndexAtom);
  const hoveredIndex = get(hoveredIndexAtom);
  const pieces = get(piecesAtom);

  if (!isGrabbing) return;

  if (hoveredIndex === grabIndex) {
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
  set(hoveredIndexAtom, -1);
});
