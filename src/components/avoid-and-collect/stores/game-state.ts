import { atom } from 'jotai';
import {
  resetCatcherPositionXAtom,
  resetFallingItemsAtom,
  resetLifeAtom,
  resetScoreAtom,
} from './play-state';

const isPlayingAtom = atom(false);
const gameOverAtom = atom(false);

// Getter
export const getIsPlayingAtom = atom((get) => get(isPlayingAtom));
export const getGameOverAtom = atom((get) => get(gameOverAtom));

// Setter
export const startGameAtom = atom(null, (_, set) => {
  set(isPlayingAtom, true);
});
export const onGameOverAtom = atom(null, (_, set) => {
  set(gameOverAtom, true);
});

export const resetGameAtom = atom(null, (_, set) => {
  set(gameOverAtom, false);
  set(resetLifeAtom);
  set(resetScoreAtom);
  set(resetCatcherPositionXAtom);
  set(resetFallingItemsAtom);
});
