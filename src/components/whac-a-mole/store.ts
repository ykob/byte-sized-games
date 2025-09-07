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

export const hitGoodMoleAtom = atom(null, (get, set, index: number) => {
  const moles = get(molesAtom);
  const mole = moles[index];

  if (!mole || mole.hit === true) return;

  mole.hit = true;
  set(molesAtom, moles);
  set(scoreAtom, (prev) => prev + 1);
});

export const hitBadMoleAtom = atom(null, (get, set, index: number) => {
  const moles = get(molesAtom);
  const mole = moles[index];

  if (!mole || mole.hit === true) return;

  mole.hit = true;
  set(molesAtom, moles);
});
