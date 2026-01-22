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
  x: Lane;
  y: number;
  velocity: number;
  acceleration: number;
  hit: boolean;
  type: 'FAULT_1' | 'FAULT_2' | 'FAULT_3' | 'SUCCESS';
};

const TARGET_COUNT = 20;
const Y_DIFF = 20;
const Y_RESET = 100;
const BASE_ACCELERATION = 15;
const MAX_ACCELERATION = 60;
const ADD_ACCELERATION = 0.05;

let currentAcceleration = BASE_ACCELERATION;

const selectFallingItemType = (typeNumber: number) => {
  switch (typeNumber) {
    case 0:
      return 'FAULT_1';
    case 1:
      return 'FAULT_2';
    case 2:
      return 'FAULT_3';
    default:
      return 'SUCCESS';
  }
};

const createFallingItems = (): FallingItem[] => {
  const items: FallingItem[] = [];
  for (let i = 0; i < 20; i++) {
    const x = Math.floor(Math.random() * 5);
    const y = i * Y_DIFF * -1 - Y_RESET;
    items.push({
      index: i,
      x: isLane(x) ? x : 2,
      y,
      velocity: y,
      acceleration: BASE_ACCELERATION + ADD_ACCELERATION * i,
      hit: false,
      type: selectFallingItemType(Math.floor(Math.random() * 3)),
    });
  }
  return items;
};

const fallingItemsAtom = atom<FallingItem[]>(createFallingItems());

export const getFallingItemPropsAtom = atomFamily((index: number) =>
  atom((get) => get(fallingItemsAtom)[index])
);

export const updateFallingItemsAtom = atom(
  null,
  (get, set, { deltaTime }: { deltaTime: number }) => {
    const prevItems = get(fallingItemsAtom);
    const catcherPositionX = get(getCatcherPositionXAtom);
    const items = [...prevItems];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.y += item.acceleration * deltaTime;
      if (item.hit === false) {
        item.y = item.velocity;
      }
      if (item.y > 20) {
        const x = Math.floor(Math.random() * 5);
        item.x = isLane(x) ? x : 2;
        item.y = item.y = TARGET_COUNT * Y_DIFF * -1 + 20;
        item.acceleration = Math.min(currentAcceleration + ADD_ACCELERATION, MAX_ACCELERATION);
        currentAcceleration = item.acceleration;
        item.hit = false;
      }
      if (item.hit === false && catcherPositionX === item.x && Math.abs(item.y) < 1) {
        item.hit = true;
      }
    }

    set(fallingItemsAtom, items);
  }
);
