import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';

export type Lane = 0 | 1 | 2 | 3 | 4;
const isLane = (val: number): val is Lane => {
  return val >= 0 && val <= 4;
};

// Life
const lifeAtom = atom(3);

export const getLifeAtom = atom((get) => get(lifeAtom));

export const decrementLifeAtom = atom(null, (_, set) => {
  set(lifeAtom, (prev) => prev - 1);
});

export const resetLifeAtom = atom(null, (_, set) => {
  set(lifeAtom, 3);
});

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

export const resetCatcherPositionXAtom = atom(null, (_, set) => {
  set(catcherPositionXAtom, 2);
});

// Falling Items
type FallingItem = {
  index: number;
  x: Lane;
  y: number;
  velocity: number;
  acceleration: number;
  hit: boolean;
  type: 'SUCCESS_1' | 'SUCCESS_2' | 'SUCCESS_3' | 'FAULT';
};

const Y_LIMIT = 40;
const Y_DIFF = 30;
const BASE_ACCELERATION = 60;
const MAX_ACCELERATION = 120;
const ADD_ACCELERATION = 0.2;

let currentAcceleration = BASE_ACCELERATION;

const selectFallingItemType = () => {
  const randomNumber = Math.floor(Math.random() * 6);

  switch (randomNumber) {
    case 0:
      return 'SUCCESS_1';
    case 1:
      return 'SUCCESS_2';
    case 2:
      return 'SUCCESS_3';
    default:
      return 'FAULT';
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
      type: selectFallingItemType(),
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
      if (newItem.type === 'FAULT') {
        set(decrementLifeAtom);
      } else {
        set(incrementScoreAtom);
      }
    }
    return newItem;
  });

  set(fallingItemsAtom, newItems);
});

export const resetFallingItemsAtom = atom(null, (_, set) => {
  set(fallingItemsAtom, createFallingItems());
  currentAcceleration = BASE_ACCELERATION;
});
