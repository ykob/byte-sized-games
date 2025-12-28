import { useSyncExternalStore, type RefObject } from 'react';
import { css } from 'styled-system/css';
import { Timer as CommonTimer } from '~/components/common/';

type TimerProps = {
  limit: number;
  timeRef: RefObject<number>;
  subscribe: (onStoreChange: () => void) => () => boolean;
};

export const Timer = ({ limit, timeRef, subscribe }: TimerProps) => {
  const time = useSyncExternalStore(subscribe, () => {
    return timeRef.current;
  });

  return (
    <div className={styles.container}>
      <CommonTimer time={limit - time} />
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
