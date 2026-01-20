import { useSetAtom } from 'jotai';
import { moveCatcherLeftAtom } from './store';

export const MoveLeftButton = () => {
  const moveCatcherLeft = useSetAtom(moveCatcherLeftAtom);

  return <button onClick={moveCatcherLeft}>Move Left</button>;
};
