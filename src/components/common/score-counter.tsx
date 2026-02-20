import { mdiStarCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { css } from 'styled-system/css';

type Props = {
  score: number;
};

export const ScoreCounter = ({ score }: Props) => {
  return (
    <div className={styles.container}>
      <Icon path={mdiStarCircle} size={ICON_SIZE} />
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
