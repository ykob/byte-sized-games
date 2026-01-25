import { useAtomValue } from 'jotai';
import { getScoreAtom } from './store';

export const ScoreView = () => {
  const score = useAtomValue(getScoreAtom);

  return <div>Score: {score}</div>;
};
