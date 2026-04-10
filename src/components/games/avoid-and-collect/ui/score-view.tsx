import { useAtomValue } from 'jotai';
import { ScoreCounter } from '~/components/common';
import { getScoreAtom } from '../stores';

export const ScoreView = () => {
  const score = useAtomValue(getScoreAtom);

  return <ScoreCounter score={score} />;
};
