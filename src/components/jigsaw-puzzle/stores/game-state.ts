import { atom } from 'jotai';
import { resetPieceAtom } from './piece-state';

const gameOverAtom = atom(false);

// Getter
export const getGameOverAtom = atom((get) => get(gameOverAtom));

// Setter
export const onGameOverAtom = atom(null, (_, set) => {
  set(gameOverAtom, true);
});

export const resetGameAtom = atom(null, (_, set) => {
  set(gameOverAtom, false);
  set(resetPieceAtom);
});
