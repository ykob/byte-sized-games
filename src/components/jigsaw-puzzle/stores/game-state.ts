import { atom } from 'jotai';
import { resetPiecesAtom } from './piece-state';

const isPlayingAtom = atom(false);
export const getIsPlayingAtom = atom((get) => get(isPlayingAtom));
export const startGameAtom = atom(null, (_, set) => {
  set(isPlayingAtom, true);
});

const gameOverAtom = atom(false);
export const getGameOverAtom = atom((get) => get(gameOverAtom));
export const onGameOverAtom = atom(null, (_, set) => {
  set(gameOverAtom, true);
});

export const resetGameAtom = atom(null, (_, set) => {
  set(gameOverAtom, false);
  set(resetPiecesAtom);
});
