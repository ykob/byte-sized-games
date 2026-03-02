import { useAtomValue } from 'jotai';
import { getScoreAtom } from '../stores';
import { formatScore } from '~/utils/format-score';

export const FinalScore = () => {
  const score = useAtomValue(getScoreAtom);

  return <p>Final Score: {formatScore(score)}</p>;
};
