import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';

export type Lane = 0 | 1 | 2 | 3 | 4;
const isLane = (val: number): val is Lane => {
  return val >= 0 && val <= 4;
};

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
const catcherPositionXAtom = atom<Lane>(2);

export const getCatcherPositionXAtom = atom((get) => get(catcherPositionXAtom));

export const moveCatcherLeftAtom = atom(null, (_, set) => {
  set(catcherPositionXAtom, (prev) => {
    const next = prev - 1;
    return isLane(next) ? next : prev;
  });
});

export const moveCatcherRightAtom = atom(null, (_, set) => {
  set(catcherPositionXAtom, (prev) => {
    const next = prev + 1;
    return isLane(next) ? next : prev;
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
