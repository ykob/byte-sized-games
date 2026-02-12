import { useSetAtom } from 'jotai';
import { Button } from '~/components/common';
import { moveCatcherRightAtom } from '../stores';

export const MoveRightButton = () => {
  const moveCatcherRight = useSetAtom(moveCatcherRightAtom);

  return <Button onClick={moveCatcherRight}>Move Right</Button>;
};
