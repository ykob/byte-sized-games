import { mdiStarCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { formatScore } from '~/utils';

type Props = {
  score: number;
};

export const ScoreCounter = ({ score }: Props) => {
  return (
    <div className="flex items-center">
      <Icon path={mdiStarCircle} size={2} />
      <div className="text-3xl leading-none font-medium">{formatScore(score)}</div>
    </div>
  );
};
