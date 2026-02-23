import { mdiStarCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { css } from 'styled-system/css';

type Props = {
  score: number;
};

const SCORE_DISPLAY_LIMIT = 1000;
const MAX_SCORE_TEXT = '999+';

export const ScoreCounter = ({ score }: Props) => {
  return (
    <div className={styles.container}>
      <Icon path={mdiStarCircle} size={2} />
      <div className={styles.label}>{score < SCORE_DISPLAY_LIMIT ? score : MAX_SCORE_TEXT}</div>
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
