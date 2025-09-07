import { atom } from 'jotai';
import { createMoles } from './create-moles';

const molesAtom = atom(createMoles());
const scoreAtom = atom(0);

// Getter
export const getMolesAtom = atom((get) => get(molesAtom));
export const getScoreAtom = atom((get) => get(scoreAtom));

// Setter
export const resetGameAtom = atom(null, (_, set) => {
  set(scoreAtom, 0);
  set(molesAtom, createMoles());
});

export const incrementScoreAtom = atom(null, (_, set) => {
  set(scoreAtom, (prev) => prev + 1);
});
