import { mdiStarCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { formatScore } from '~/utils';

type Props = {
  score: number;
};

export const ScoreCounter = ({ score }: Props) => {
  return (
    <div className={styles.container}>
      <Icon path={mdiStarCircle} size={2} />
      <div className={styles.label}>{formatScore(score)}</div>
    </div>
  );
};

const styles = {
  container: 'flex items-center',
  label: 'text-3xl font-medium leading-none',
};
