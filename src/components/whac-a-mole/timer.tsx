import { css } from 'styled-system/css';
import { Timer as CommonTimer } from '~/components/common/';

type TimerProps = {
  time: number;
};

export const Timer = ({ time }: TimerProps) => {
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
