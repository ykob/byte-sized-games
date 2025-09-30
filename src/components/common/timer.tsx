import { mdiTimer } from '@mdi/js';
import Icon from '@mdi/react';
import { css } from 'styled-system/css';

type TimerProps = {
  time: number;
};

const zeroPadding = (num: number, length: number) => {
  return ('0000000000' + num).slice(-length);
};

export const Timer = ({ time }: TimerProps) => {
  const second = Math.floor(time / 1000);
  const millisecond = Math.floor((time - second * 1000) / 10);

  return (
    <div className={styles.container}>
      <Icon path={mdiTimer} size={2} />
      <div className={styles.label}>
        {second}.{zeroPadding(millisecond, 2)}
      </div>
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
