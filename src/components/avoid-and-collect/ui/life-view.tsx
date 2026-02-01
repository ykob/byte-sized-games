import { useAtomValue } from 'jotai';
import { getLifeAtom } from '../store';

export const LifeView = () => {
  const life = useAtomValue(getLifeAtom);

  return <div>Life: {life}</div>;
};
