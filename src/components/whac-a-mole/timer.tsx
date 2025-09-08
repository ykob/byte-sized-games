import { css } from 'styled-system/css';

type TimerProps = {
  time: number;
};

export const Timer = ({ time }: TimerProps) => {
  return <div className={styles.container}>time: {time}</div>;
};

const styles = {
  container: css({
    color: '#F25781',
  }),
};
