import { useAtomValue } from 'jotai';
import { memo } from 'react';
import { css } from 'styled-system/css';
import { Timer as CommonTimer } from '~/components/common/';
import { getTimeAtom } from '~/hooks/use-timer/store';

type TimerProps = {
  limit: number;
};

const TimerComponent = ({ limit }: TimerProps) => {
  const time = useAtomValue(getTimeAtom);

  return (
    <div className={styles.container}>
      <CommonTimer time={limit - time} />
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
