import { atom } from 'jotai';
import { shuffleArray } from '~/utils';
import { onGameOverAtom } from './game-over';

type Piece = {
  index: number;
  x: number;
  y: number;
  fitted: boolean;
  zIndex: number;
};

const column = 6;
const row = 4;

const createPieces = (): Piece[] => {
  return shuffleArray(
    Array.from({ length: row * column }, (_, i) => {
      return {
        index: i,
        x: 0,
        y: 0,
        fitted: false,
        zIndex: Math.random() * 100,
      };
    })
  )
    .map((piece, index) => {
      return {
        ...piece,
        x: Math.floor(index / row) + (Math.random() * 0.4 - 0.2),
        y: (index % row) + (Math.random() * 0.4 - 0.2),
      };
    })
    .sort((a, b) => a.index - b.index);
};

const cursorPositionAtom = atom({ x: 0, y: 0 });
const grabIndexAtom = atom(-1);
const gridAtom = atom({ row, column });
const piecesAtom = atom<Piece[]>(createPieces());

// Getter
export const getCursorPositionAtom = atom((get) => get(cursorPositionAtom));
export const getGrabIndexAtom = atom((get) => get(grabIndexAtom));
export const getGridAtom = atom((get) => get(gridAtom));
export const getPiecesAtom = atom((get) => get(piecesAtom));

// Setter
export const setCursorPositionAtom = atom(null, (_, set, position: { x: number; y: number }) => {
  set(cursorPositionAtom, position);
});

export const grabPieceAtom = atom(null, (_, set, index: number) => {
  set(grabIndexAtom, index);
});

export const releasePieceAtom = atom(null, (get, set, index: number) => {
  const grabIndex = get(grabIndexAtom);
  const pieces = get(piecesAtom);

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
    const unfitPieces = newPieces.filter((piece) => !piece.fitted);

    set(piecesAtom, newPieces);
    if (unfitPieces.length === 0) {
      set(onGameOverAtom);
    }
  }
  set(grabIndexAtom, -1);
});

export const resetPieceAtom = atom(null, (_, set) => {
  set(piecesAtom, createPieces());
  set(grabIndexAtom, -1);
});
