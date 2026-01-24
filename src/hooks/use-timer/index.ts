import { useEffect, useRef } from 'react';
import { expireTimer, startTimer, updateTime, useIsTimerExpired } from './store';

type useTimerProps = {
  limit?: number | null;
  update?: (delta: number) => void;
};

export const useTimer = ({ limit = null, update: onUpdate }: useTimerProps = {}) => {
  const time = useRef(0);
  const prevTime = useRef(0);
  const frame = useRef(0);
  const isRunning = useRef(false);
  const isExpired = useIsTimerExpired();

  const update = () => {
    if (isRunning.current === false) return;

    const currentTime = Date.now();
    const deltaTime = currentTime - prevTime.current;

    prevTime.current = currentTime;
    time.current = time.current + deltaTime;
    updateTime(time.current);
    onUpdate?.(deltaTime);

    if (limit !== null && time.current >= limit) {
      isRunning.current = false;
      time.current = limit;
      expireTimer(time.current);
      cancelAnimationFrame(frame.current);
      return;
    }

    frame.current = requestAnimationFrame(update);
  };
  const start = () => {
    if (isRunning.current) return;
    isRunning.current = true;
    prevTime.current = Date.now() - 1;
    time.current = 0;
    startTimer();

    frame.current = requestAnimationFrame(update);
  };
  const pause = () => {
    if (!isRunning.current || isExpired) return;
    isRunning.current = false;
    cancelAnimationFrame(frame.current);
  };
  const play = () => {
    if (isRunning.current || isExpired) return;
    isRunning.current = true;
    prevTime.current = Date.now() - 1;
    frame.current = requestAnimationFrame(update);
  };
  const stop = () => {
    if (!isRunning.current || isExpired) return;
    isRunning.current = false;
    time.current = 0;
    updateTime(time.current);
    cancelAnimationFrame(frame.current);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return {
    pause,
    play,
    start,
    stop,
  };
};
