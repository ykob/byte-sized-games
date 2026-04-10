import { memo } from 'react';
import { Timer as CommonTimer } from '~/components/common';
import { useTimerValue } from '~/hooks/use-timer/store';

type TimerProps = {
  limit: number;
};

const TimerComponent = ({ limit }: TimerProps) => {
  const time = useTimerValue();

  return <CommonTimer time={limit - time} />;
};

export const Timer = memo(TimerComponent);
