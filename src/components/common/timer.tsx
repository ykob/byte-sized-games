import { mdiTimer } from '@mdi/js';
import Icon from '@mdi/react';
import { css } from 'styled-system/css';

type TimerProps = {
  time: number;
};

export const Timer = ({ time }: TimerProps) => {
  return (
    <div className={styles.container}>
      <Icon path={mdiTimer} size={1.5} />
      <div className={styles.label}>{Math.ceil(time / 10)}</div>
    </div>
  );
};

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
  }),
  label: css({
    fontSize: '2xl',
    fontWeight: '500',
    lineHeight: 1,
  }),
};
