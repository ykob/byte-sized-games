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

const Y_LIMIT = 40;
const Y_DIFF = 30;
const BASE_ACCELERATION = 60;
const MAX_ACCELERATION = 120;
const ADD_ACCELERATION = 0.2;

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
  for (let i = 0; i < 12; i++) {
    const x = Math.floor(Math.random() * 5);
    const y = i * Y_DIFF * -1 - 110;
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

export const updateFallingItemsAtom = atom(null, (get, set, delta: number) => {
  const prevItems = get(fallingItemsAtom);
  const catcherPositionX = get(getCatcherPositionXAtom);
  const farestVelocity = Math.min(...prevItems.map((item) => item.velocity));

  const newItems = prevItems.map((item) => {
    const newItem = { ...item };

    newItem.velocity += (newItem.acceleration * delta) / 1000;
    if (newItem.hit === false) {
      newItem.y = newItem.velocity;
    }
    if (newItem.velocity > Y_LIMIT) {
      const x = Math.floor(Math.random() * 5);
      newItem.x = isLane(x) ? x : 2;
      newItem.y = newItem.velocity = farestVelocity - Y_DIFF;
      newItem.acceleration = Math.min(currentAcceleration + ADD_ACCELERATION, MAX_ACCELERATION);
      currentAcceleration = newItem.acceleration;
      newItem.hit = false;
    }
    if (newItem.hit === false && catcherPositionX === newItem.x && Math.abs(newItem.velocity) < 1) {
      newItem.hit = true;
    }
    return newItem;
  });

  set(fallingItemsAtom, newItems);
});
