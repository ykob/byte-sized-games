import { atom } from 'jotai';

const gameOverAtom = atom(false);

export const getGameOverAtom = atom((get) => get(gameOverAtom));

export const onGameOverAtom = atom(null, (_, set) => {
  set(gameOverAtom, true);
});

export const resetGameAtom = atom(null, (_, set) => {
  set(gameOverAtom, false);
});
