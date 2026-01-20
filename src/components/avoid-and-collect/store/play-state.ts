import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';

// Score
const scoreAtom = atom(0);

export const getScoreAtom = atom((get) => get(scoreAtom));

export const incrementScoreAtom = atom(null, (_, set) => {
  set(scoreAtom, (prev) => prev + 1);
});

export const resetScoreAtom = atom(null, (_, set) => {
  set(scoreAtom, 0);
});

// Catcher
const catcherXAtom = atom(0);

export const getCatcherXAtom = atom((get) => get(catcherXAtom));

export const moveCatcherAtom = atom(null, (_, set, direction: 'left' | 'right') => {
  set(catcherXAtom, (prev) => {
    if (direction === 'left' && prev > -2) {
      return prev - 1;
    }
    if (direction === 'right' && prev < 2) {
      return prev + 1;
    }
    return prev;
  });
});

// Falling Items
type FallingItem = {
  index: number;
  x: number;
  y: number;
  isFalling: boolean;
};

const createFallingItems = (): FallingItem[] => {
  const items: FallingItem[] = [];
  for (let i = 0; i < 20; i++) {
    items.push({
      index: i,
      x: 0,
      y: 0,
      isFalling: true,
    });
  }
  return items;
};

const fallingItemsAtom = atom<FallingItem[]>(createFallingItems());

export const getFallingItemsAtom = atomFamily((index: number) =>
  atom((get) => {
    const fallingItems = get(fallingItemsAtom);
    return fallingItems.filter((item) => item.index === index);
  })
);
