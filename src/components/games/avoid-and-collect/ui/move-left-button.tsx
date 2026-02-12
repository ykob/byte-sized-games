import { useSetAtom } from 'jotai';
import { Button } from '~/components/common';
import { moveCatcherLeftAtom } from '../stores';

export const MoveLeftButton = () => {
  const moveCatcherLeft = useSetAtom(moveCatcherLeftAtom);

  return <Button onClick={moveCatcherLeft}>Move Left</Button>;
};
