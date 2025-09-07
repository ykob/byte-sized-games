import { Moles } from './moles';
import { Timer } from './timer';
import { useTimerHook } from './use-timer-hook';

export const Content = () => {
  const { time } = useTimerHook();

  return (
    <div>
      <Timer time={time} />
      <Moles time={time} />
    </div>
  );
};
