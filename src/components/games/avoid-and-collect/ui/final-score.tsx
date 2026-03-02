import { useAtomValue } from 'jotai';
import { getScoreAtom } from '../stores';

export const FinalScore = () => {
  const score = useAtomValue(getScoreAtom);

  return <p>Final Score: {score}</p>;
};
