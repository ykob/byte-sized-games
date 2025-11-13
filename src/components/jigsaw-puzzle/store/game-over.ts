import { atom } from 'jotai';
import { shuffleArray } from '~/utils';

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
        x: index / (row * column - 1) + (Math.random() * 0.1 - 0.05),
        y: (index % 3) + (Math.random() * 0.2 - 0.1),
      };
    })
    .sort((a, b) => a.index - b.index);
};

export const puzzleBoardAtom = atom<HTMLElement | null>(null);
export const cursorPositionAtom = atom({ x: 0, y: 0 });

const gridAtom = atom({ row, column });
const piecesAtom = atom<Piece[]>(createPieces());
const grabIndexAtom = atom(-1);
const gameOverAtom = atom(false);

// Getter
export const getGridAtom = atom((get) => get(gridAtom));
export const getPiecesAtom = atom((get) => get(piecesAtom));
export const getGrabIndexAtom = atom((get) => get(grabIndexAtom));
export const getGameOverAtom = atom((get) => get(gameOverAtom));

// Setter
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
    set(gameOverAtom, unfitPieces.length === 0);
  }
  set(grabIndexAtom, -1);
});

export const setGameOverAtom = atom(null, (_, set, gameOver: boolean) => {
  set(gameOverAtom, gameOver);
});

export const resetGameAtom = atom(null, (_, set) => {
  set(piecesAtom, createPieces());
  set(gameOverAtom, false);
});
