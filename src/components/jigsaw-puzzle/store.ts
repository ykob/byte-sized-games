import { atom } from 'jotai';

type Piece = {
  index: number;
  x: number;
  y: number;
  fitted: boolean;
};

const basePieces: Piece[] = Array.from({ length: 9 }, (_, i) => {
  return {
    index: i,
    x: Math.random(),
    y: Math.random(),
    fitted: false,
  };
});

export const puzzleBoardAtom = atom<HTMLElement | null>(null);
export const cursorPositionAtom = atom({ x: 0, y: 0 });

const piecesAtom = atom<Piece[]>(basePieces);
const grabIndexAtom = atom(-1);
const gameCompleteAtom = atom(false);

// Getter
export const getPiecesAtom = atom((get) => get(piecesAtom));
export const getGrabIndexAtom = atom((get) => get(grabIndexAtom));
export const getGameCompleteAtom = atom((get) => get(gameCompleteAtom));

// Setter
export const grabPieceAtom = atom(null, (get, set, index: number) => {
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
    set(gameCompleteAtom, unfitPieces.length === 0);
  }
  set(grabIndexAtom, -1);
});
