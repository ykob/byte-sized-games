import { mdiStarCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { css } from 'styled-system/css';
import { formatScore } from '~/utils/format-score';

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
  container: css({
    display: 'flex',
    alignItems: 'center',
  }),
  label: css({
    fontSize: '3xl',
    fontWeight: '500',
    lineHeight: 1,
  }),
};
