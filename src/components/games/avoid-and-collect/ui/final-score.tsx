import { useAtomValue } from 'jotai';
import { formatScore } from '~/utils';
import { getScoreAtom } from '../stores';

export const FinalScore = () => {
  const score = useAtomValue(getScoreAtom);

  return <p>Final Score: {formatScore(score)}</p>;
};
