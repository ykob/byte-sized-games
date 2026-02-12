import { useAtomValue } from 'jotai';
import { getScoreAtom } from '../stores';

export const ScoreView = () => {
  const score = useAtomValue(getScoreAtom);

  return <div>Score: {score}</div>;
};
