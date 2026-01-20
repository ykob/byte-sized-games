import { useSetAtom } from 'jotai';
import { moveCatcherRightAtom } from './store';

export const MoveRightButton = () => {
  const moveCatcherRight = useSetAtom(moveCatcherRightAtom);

  return <button onClick={moveCatcherRight}>Move Right</button>;
};
