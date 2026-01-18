import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';
import { shuffleArray } from '~/utils';

type Piece = {
  index: number;
  x: number;
  y: number;
  fitted: boolean;
  zIndex: number;
};

// ==================================================
// Grid
// ==================================================
const column = 6;
const row = 4;
const gridAtom = atom({ row, column });

export const getGridAtom = atom((get) => get(gridAtom));

// ==================================================
// Board Size
// ==================================================
const boardSizeAtom = atom({ width: 0, height: 0 });

export const getBoardSizeAtom = atom((get) => get(boardSizeAtom));

export const setBoardSizeAtom = atom(null, (_, set, size: { width: number; height: number }) => {
  set(boardSizeAtom, size);
});

// ==================================================
// Pieces
// ==================================================
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
const piecesAtom = atom<Piece[]>(createPieces());

export const getPiecesAtom = atom((get) => get(piecesAtom));

export const getPiecePropsAtom = atomFamily((index: number) =>
  atom((get) => get(piecesAtom)[index])
);

export const isAllPiecesFittedAtom = atom((get) => {
  const pieces = get(piecesAtom);
  if (pieces.length === 0) return false;
  return pieces.every((piece) => piece.fitted);
});

export const resetPiecesAtom = atom(null, (_, set) => {
  set(piecesAtom, createPieces());
  set(grabIndexAtom, -1);
});

// ==================================================
// Piece Interaction
// ==================================================
const grabIndexAtom = atom(-1);

export const getIsPeaceGrabbingAtom = atomFamily((index: number) =>
  atom((get) => {
    const grabIndex = get(grabIndexAtom);
    return index === grabIndex;
  })
);

export const grabPieceAtom = atom(null, (_, set, index: number) => {
  set(grabIndexAtom, index);
});

export const releasePieceAtom = atom(null, (get, set, index: number) => {
  const grabIndex = get(grabIndexAtom);

  if (index === grabIndex) {
    const pieces = get(piecesAtom);
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
  set(grabIndexAtom, -1);
});

// ==================================================
// Cursor Position
// ==================================================
const defaultCursorPosition = { x: 0, y: 0 };
const cursorPositionAtom = atom(defaultCursorPosition);

export const getPieceCursorPositionAtom = atomFamily((index: number) =>
  atom((get) => {
    const grabIndex = get(grabIndexAtom);

    if (index === grabIndex) return get(cursorPositionAtom);

    return defaultCursorPosition;
  })
);

export const setCursorPositionAtom = atom(null, (_, set, position: { x: number; y: number }) => {
  set(cursorPositionAtom, position);
});
