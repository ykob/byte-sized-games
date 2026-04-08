import { useAtomValue } from 'jotai';
import { LifeCounter } from '~/components/common';
import { getLifeAtom } from '../stores';

export const LifeView = () => {
  const life = useAtomValue(getLifeAtom);

  return <LifeCounter current={life} max={3} />;
};
