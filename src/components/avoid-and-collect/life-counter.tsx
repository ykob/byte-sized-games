import { useAtomValue } from 'jotai';
import { getLifeAtom } from './store';

export const LifeCounter = () => {
  const life = useAtomValue(getLifeAtom);

  return <div>Life: {life}</div>;
};
