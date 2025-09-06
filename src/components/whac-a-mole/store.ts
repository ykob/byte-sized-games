import { atom } from 'jotai';
import { shuffleArray } from '~/utils';

type Mole = {
  id: number;
  time: number;
  visibleDuration: number;
  position: number;
  hit: boolean;
};

const HOLE_COUNT = 9;
const TOTAL_GAME_TIME = 60000;
const TOTAL_MOLE_COUNT = 60;
const HIT_MOLE_COUNT = 30;
const MAX_VISIBLE_DURATION = 500;
const MIN_VISIBLE_DURATION = 200;
const JITTER = 50;

const createMoles = (): Mole[] => {
  const moles: Mole[] = [];
  const baseArray = shuffleArray([
    ...Array.from({ length: HIT_MOLE_COUNT }, (_, i) => {
      return {
        id: i,
        time: 0,
        duration: 0,
        position: 0,
        hit: true,
      };
    }),
    ...Array.from({ length: TOTAL_MOLE_COUNT - HIT_MOLE_COUNT }, (_, i) => {
      return {
        id: i,
        time: 0,
        duration: 0,
        position: 0,
        hit: false,
      };
    }),
  ])
    .map((mole, i) => {
      const progress = i / (TOTAL_MOLE_COUNT - 1);
      const rushExponent = 2.5;
      const easedProgress = Math.pow(progress, rushExponent);
      const baseTime = easedProgress * (TOTAL_GAME_TIME - MIN_VISIBLE_DURATION - JITTER);
      const jitter = Math.random() * JITTER;
      const time = baseTime + jitter;

      return {
        ...mole,
        time,
      };
    })
    .sort((a, b) => a.time - b.time);

  for (let i = 0; i < baseArray.length; i++) {
    const mole = baseArray[i];
    const progress = i / (TOTAL_MOLE_COUNT - 1);
    const visibleDuration =
      MAX_VISIBLE_DURATION - (MAX_VISIBLE_DURATION - MIN_VISIBLE_DURATION) * progress;

    let position = 0;
    let isPositionValid = false;

    do {
      position = Math.floor(Math.random() * HOLE_COUNT);

      const lastMoleInSameHole = moles.findLast((mole) => mole.position === position);

      if (lastMoleInSameHole) {
        const lastMoleEndTime = lastMoleInSameHole.time + lastMoleInSameHole.visibleDuration;

        isPositionValid = mole.time >= lastMoleEndTime;
      } else {
        isPositionValid = true;
      }
    } while (isPositionValid === false);

    moles.push({
      ...mole,
      position,
      visibleDuration,
    });
  }

  return moles;
};

const molesAtom = atom(createMoles());

export const getMolesAtom = atom((get) => get(molesAtom));
