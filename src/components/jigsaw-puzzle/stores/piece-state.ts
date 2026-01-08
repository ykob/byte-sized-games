import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';
import { shuffleArray } from '~/utils';
import { onGameOverAtom } from './game-state';

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
const boardSizeAtom = atom({ width: 0, height: 0 });

// Getter
const defaultCursorPosition = { x: 0, y: 0 };
export const getPieceCursorPositionAtom = atomFamily((index: number) =>
  atom((get) => {
    const grabIndex = get(grabIndexAtom);

    if (index === grabIndex) return get(cursorPositionAtom);

    return defaultCursorPosition;
  })
);
export const getIsPeaceGrabbingAtom = atomFamily((index: number) =>
  atom((get) => {
    const grabIndex = get(grabIndexAtom);
    return index === grabIndex;
  })
);
export const getPiecePropsAtom = atomFamily((index: number) =>
  atom((get) => get(piecesAtom)[index])
);
export const getGridAtom = atom((get) => get(gridAtom));
export const getPiecesAtom = atom((get) => get(piecesAtom));
export const getBoardSizeAtom = atom((get) => get(boardSizeAtom));

// Setter
export const setBoardSizeAtom = atom(null, (_, set, size: { width: number; height: number }) => {
  set(boardSizeAtom, size);
});

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
