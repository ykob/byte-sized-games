import { mdiTimer } from '@mdi/js';
import Icon from '@mdi/react';
import { zeroPadding } from '~/utils';

type TimerProps = {
  time: number;
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
  container: 'flex items-center',
  label: 'text-3xl font-medium leading-none',
};
