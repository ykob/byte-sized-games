import { atom } from 'jotai';

const isExpiredAtom = atom(false);
const timeAtom = atom(0);

// Getter
export const getIsTimerExpiredAtom = atom((get) => get(isExpiredAtom));
export const getTimeAtom = atom((get) => get(timeAtom));

// Setter
export const startTimerAtom = atom(null, (_, set) => {
  set(isExpiredAtom, false);
  set(timeAtom, 0);
});
export const expireTimerAtom = atom(null, (_, set, { time }: { time: number }) => {
  set(isExpiredAtom, true);
  set(timeAtom, time);
});
export const updateTimeAtom = atom(null, (_, set, { time }: { time: number }) => {
  set(timeAtom, time);
});
