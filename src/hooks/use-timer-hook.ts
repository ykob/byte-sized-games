import { useEffect, useRef, useState } from 'react';

type useTimerHookProps = {
  limit?: number;
};

export const useTimerHook = ({ limit = 60000 }: useTimerHookProps = {}) => {
  const [time, setTime] = useState(0);
  const prevTime = useRef(0);
  const frame = useRef(0);
  const isRunning = useRef(false);

  const update = () => {
    const currentTime = Date.now();
    const deltaTime = currentTime - prevTime.current;

    prevTime.current = currentTime;
    setTime((time) => time + deltaTime);
  };
  const start = () => {
    if (isRunning.current) return;
    isRunning.current = true;
    prevTime.current = Date.now() - 1;
    setTime(0);
    frame.current = requestAnimationFrame(update);
  };
  const pause = () => {
    if (!isRunning.current) return;
    isRunning.current = false;
    cancelAnimationFrame(frame.current);
  };
  const play = () => {
    if (isRunning.current) return;
    isRunning.current = true;
    prevTime.current = Date.now() - 1;
    frame.current = requestAnimationFrame(update);
  };
  const stop = () => {
    if (!isRunning.current) return;
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
    if (time < limit) {
      frame.current = requestAnimationFrame(update);
    } else {
      setTime(limit);
      cancelAnimationFrame(frame.current);
    }
  }, [time]);

  return {
    isRunning,
    pause,
    play,
    start,
    stop,
    time,
  };
};
