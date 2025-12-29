import { atom, createStore, useAtomValue } from 'jotai';

const isExpiredAtom = atom(false);
const timeAtom = atom(0);

// Store
const timerStore = createStore();

// --- For Logic ---
export const getTimerState = () => ({
  time: timerStore.get(timeAtom),
  isExpired: timerStore.get(isExpiredAtom),
});

export const updateTime = (time: number) => timerStore.set(timeAtom, time);

export const startTimer = () => {
  timerStore.set(isExpiredAtom, false);
  timerStore.set(timeAtom, 0);
};

export const expireTimer = (time: number) => {
  timerStore.set(isExpiredAtom, true);
  timerStore.set(timeAtom, time);
};

// --- For UI ---
export const useTimerValue = () => useAtomValue(timeAtom, { store: timerStore });
export const useIsTimerExpired = () => useAtomValue(isExpiredAtom, { store: timerStore });
