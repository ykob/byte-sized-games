import { shuffleArray } from '~/utils';

type MoleType = 'good' | 'bad';
type Mole = {
  id: number;
  hit: boolean;
  position: number;
  time: number;
  type: MoleType;
  visibleDuration: number;
};

const HOLE_COUNT = 9;
const INTRO_TIME = 500;
const TOTAL_GAME_TIME = 29500;
const TOTAL_MOLE_COUNT = 80;
const HIT_MOLE_COUNT = 50;
const MAX_VISIBLE_DURATION = 1500;
const MIN_VISIBLE_DURATION = 750;
const JITTER = 200;

export const createMoles = (): Mole[] => {
  const moles: Mole[] = [];
  const baseMoleProps = {
    visibleDuration: 0,
    hit: false,
    position: 0,
    time: 0,
  };
  const baseArray: Mole[] = shuffleArray([
    ...Array.from({ length: HIT_MOLE_COUNT }, (_, i) => {
      return {
        ...baseMoleProps,
        id: i,
        type: 'good' as MoleType,
      };
    }),
    ...Array.from({ length: TOTAL_MOLE_COUNT - HIT_MOLE_COUNT }, (_, i) => {
      return {
        ...baseMoleProps,
        id: i + HIT_MOLE_COUNT,
        type: 'bad' as MoleType,
      };
    }),
  ])
    .map((mole, i) => {
      const progress = i / (TOTAL_MOLE_COUNT - 1);
      const rushExponent = 1.2;
      const easedProgress = Math.pow(progress, rushExponent);
      const baseTime =
        (1.0 - easedProgress) * (TOTAL_GAME_TIME - MIN_VISIBLE_DURATION - JITTER - INTRO_TIME) +
        INTRO_TIME;
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
    while (true) {
      position = Math.floor(Math.random() * HOLE_COUNT);

      const lastMoleInSameHole = moles.findLast((mole) => mole.position === position);

      if (!lastMoleInSameHole) {
        break;
      }

      const lastMoleEndTime = lastMoleInSameHole.time + lastMoleInSameHole.visibleDuration;
      if (mole.time >= lastMoleEndTime) {
        break;
      }
    }

    moles.push({
      ...mole,
      position,
      visibleDuration,
    });
  }

  return moles;
};
