import { useAtomValue } from 'jotai';
import { getLifeAtom } from '../stores';

export const LifeView = () => {
  const life = useAtomValue(getLifeAtom);

  return <div>Life: {life}</div>;
};
