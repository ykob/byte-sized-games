import { memo } from 'react';
import { css } from 'styled-system/css';
import { Timer as CommonTimer } from '~/components/common/';
import { useTimerValue } from '~/hooks/use-timer/store';

const TimerComponent = () => {
  const time = useTimerValue();

  return (
    <div className={styles.container}>
      <CommonTimer time={time} />
    </div>
  );
};

export const Timer = memo(TimerComponent);

const styles = {
  container: css({
    pos: 'absolute',
    top: '16px',
    left: '16px',
  }),
};
