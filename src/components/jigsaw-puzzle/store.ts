import { atom } from 'jotai';

export const puzzleBoardAtom = atom<HTMLElement | null>(null);
export const isGrabbingAtom = atom(false);
export const cursorPositionAtom = atom({ x: 0, y: 0 });
const grabIndex = atom(-1);

export const getGrabIndexAtom = atom((get) => get(grabIndex));

export const grabPieceAtom = atom(null, (get, set, id: number) => {
  const isGrabbing = get(isGrabbingAtom);

  if (isGrabbing) return;

  set(isGrabbingAtom, true);
  set(grabIndex, id);
});

export const releasePieceAtom = atom(null, (get, set) => {
  const isGrabbing = get(isGrabbingAtom);

  if (!isGrabbing) return;

  set(isGrabbingAtom, false);
  set(grabIndex, -1);
});
