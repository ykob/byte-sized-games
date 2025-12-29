import { css } from 'styled-system/css';
import { Timer as CommonTimer } from '~/components/common/';
import { useTimerValue } from '~/hooks/use-timer/store';

export const Timer = () => {
  const time = useTimerValue();

  return (
    <div className={styles.container}>
      <CommonTimer time={time} />
    </div>
  );
};

const styles = {
  container: css({
    pos: 'absolute',
    top: '16px',
    left: '16px',
  }),
};
