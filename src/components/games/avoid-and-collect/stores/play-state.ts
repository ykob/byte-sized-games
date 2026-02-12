import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';
import {
  ADD_ACCELERATION,
  BASE_ACCELERATION,
  BASE_FAULT_PROBABILITY,
  FALLING_ITEM_COUNT,
  INITIAL_CATCHER_LANE,
  INITIAL_LIFE,
  MAX_ACCELERATION,
  MAX_FAULT_PROBABILITY,
  MAX_SCORE_FOR_PROBABILITY_CALC,
  Y_DIFF,
  Y_LIMIT,
} from './constants';

export type Lane = 0 | 1 | 2 | 3 | 4;
const isLane = (val: number): val is Lane => {
  return val >= 0 && val <= 4;
};

// Life
const lifeAtom = atom(INITIAL_LIFE);

export const getLifeAtom = atom((get) => get(lifeAtom));

export const decrementLifeAtom = atom(null, (_, set) => {
  set(lifeAtom, (prev) => prev - 1);
});

export const resetLifeAtom = atom(null, (_, set) => {
  set(lifeAtom, INITIAL_LIFE);
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
const catcherPositionXAtom = atom<Lane>(INITIAL_CATCHER_LANE);

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
  set(catcherPositionXAtom, INITIAL_CATCHER_LANE);
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

let currentAcceleration = BASE_ACCELERATION;

const selectFallingItemType = (score: number) => {
  const currentScore = Math.min(score, MAX_SCORE_FOR_PROBABILITY_CALC);
  const faultProbability =
    BASE_FAULT_PROBABILITY +
    (MAX_FAULT_PROBABILITY - BASE_FAULT_PROBABILITY) *
      (currentScore / MAX_SCORE_FOR_PROBABILITY_CALC);

  if (Math.random() < faultProbability) {
    return 'FAULT';
  }

  const successTypes = ['SUCCESS_1', 'SUCCESS_2', 'SUCCESS_3'] as const;
  const randomIndex = Math.floor(Math.random() * successTypes.length);
  return successTypes[randomIndex];
};

const createFallingItems = (score: number): FallingItem[] => {
  const items: FallingItem[] = [];
  for (let i = 0; i < FALLING_ITEM_COUNT; i++) {
    const x = Math.floor(Math.random() * 5);
    const y = i * Y_DIFF * -1 - 110;
    items.push({
      index: i,
      x: isLane(x) ? x : INITIAL_CATCHER_LANE,
      y,
      velocity: y,
      acceleration: BASE_ACCELERATION + ADD_ACCELERATION * i,
      hit: false,
      type: selectFallingItemType(score),
    });
  }
  return items;
};

const fallingItemsAtom = atom<FallingItem[]>(createFallingItems(0));

export const getFallingItemPropsAtom = atomFamily((index: number) =>
  atom((get) => get(fallingItemsAtom)[index])
);

export const updateFallingItemsAtom = atom(null, (get, set, delta: number) => {
  const prevItems = get(fallingItemsAtom);
  const catcherPositionX = get(getCatcherPositionXAtom);
  const score = get(scoreAtom);
  const farestVelocity = Math.min(...prevItems.map((item) => item.velocity));

  const newItems = prevItems.map((item) => {
    const newItem = { ...item };

    newItem.velocity += (newItem.acceleration * delta) / 1000;
    if (newItem.hit === false) {
      newItem.y = newItem.velocity;
    }
    if (newItem.velocity > Y_LIMIT) {
      const x = Math.floor(Math.random() * 5);
      newItem.x = isLane(x) ? x : INITIAL_CATCHER_LANE;
      newItem.y = newItem.velocity = farestVelocity - Y_DIFF;
      newItem.acceleration = Math.min(currentAcceleration + ADD_ACCELERATION, MAX_ACCELERATION);
      currentAcceleration = newItem.acceleration;
      newItem.hit = false;
      newItem.type = selectFallingItemType(score);
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
  set(fallingItemsAtom, createFallingItems(0));
  currentAcceleration = BASE_ACCELERATION;
});
