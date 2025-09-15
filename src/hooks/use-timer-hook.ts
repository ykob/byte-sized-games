import { useEffect, useRef, useState } from 'react';

type useTimerHookProps = {
  limit?: number;
};

export const useTimerHook = ({ limit = 60000 }: useTimerHookProps = {}) => {
  const [time, setTime] = useState(0);
  const prevTime = useRef(0);
  const frame = useRef(0);
  const isExpired = useRef(false);
  const isRunning = useRef(false);

  const update = () => {
    const currentTime = Date.now();
    const deltaTime = currentTime - prevTime.current;

    prevTime.current = currentTime;
    setTime((time) => time + deltaTime);
  };
  const start = () => {
    if (isRunning.current) return;
    isExpired.current = false;
    isRunning.current = true;
    prevTime.current = Date.now() - 1;
    setTime(0);
    frame.current = requestAnimationFrame(update);
  };
  const pause = () => {
    if (!isRunning.current || isExpired.current) return;
    isRunning.current = false;
    cancelAnimationFrame(frame.current);
  };
  const play = () => {
    if (isRunning.current || isExpired.current) return;
    isRunning.current = true;
    prevTime.current = Date.now() - 1;
    frame.current = requestAnimationFrame(update);
  };
  const stop = () => {
    if (!isRunning.current || isExpired.current) return;
    isRunning.current = false;
    setTime(0);
    cancelAnimationFrame(frame.current);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, []);
  useEffect(() => {
    if (isRunning.current === false) return;

    if (time >= limit) {
      isExpired.current = true;
      isRunning.current = false;
      setTime(limit);
      cancelAnimationFrame(frame.current);
      return;
    }

    frame.current = requestAnimationFrame(update);
  }, [time]);

  return {
    isExpired,
    isRunning,
    pause,
    play,
    start,
    stop,
    time,
  };
};
