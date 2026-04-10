import { memo } from 'react';
import { Timer as CommonTimer } from '~/components/common';
import { useTimerValue } from '~/hooks/use-timer/store';

const TimerComponent = () => {
  const time = useTimerValue();

  return <CommonTimer time={time} />;
};

export const Timer = memo(TimerComponent);
