import { useEffect } from 'react';
import { Moles } from './moles';
import { useTimeHook } from './use-time-hook';

export const Content = () => {
  const { time, start } = useTimeHook();

  useEffect(() => {
    start();
  }, []);

  return (
    <div>
      <div>time: {time}</div>
      <Moles time={time} />
    </div>
  );
};
