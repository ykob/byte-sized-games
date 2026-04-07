import { atom } from 'jotai';
import { INITIAL_LIFE } from './constants';
import { createMoles } from './create-moles';

const molesAtom = atom(createMoles());
const scoreAtom = atom(0);
const lifeAtom = atom(INITIAL_LIFE);

// Getter
export const getMolesAtom = atom((get) => get(molesAtom));
export const getScoreAtom = atom((get) => get(scoreAtom));
export const getLifeAtom = atom((get) => get(lifeAtom));

// Setter
export const decrementLifeAtom = atom(null, (_, set) => {
  set(lifeAtom, (prev) => Math.max(0, prev - 1));
});

export const resetLifeAtom = atom(null, (_, set) => {
  set(lifeAtom, INITIAL_LIFE);
});

export const resetMolesAtom = atom(null, (_, set) => {
  set(scoreAtom, 0);
  set(lifeAtom, INITIAL_LIFE);
  set(molesAtom, createMoles());
});

export const hitGoodMoleAtom = atom(null, (get, set, index: number) => {
  const moles = get(molesAtom);
  const mole = moles[index];

  if (!mole || mole.hit === true) return;

  set(
    molesAtom,
    moles.map((m, i) => (i === index ? { ...m, hit: true } : m))
  );
  set(scoreAtom, (prev) => prev + 1);
});

export const hitBadMoleAtom = atom(null, (get, set, index: number) => {
  const moles = get(molesAtom);
  const mole = moles[index];

  if (!mole || mole.hit === true) return;

  set(
    molesAtom,
    moles.map((m, i) => (i === index ? { ...m, hit: true } : m))
  );
  set(decrementLifeAtom);
});
