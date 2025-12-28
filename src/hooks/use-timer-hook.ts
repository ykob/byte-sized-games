import { useCallback, useEffect, useRef, useState } from 'react';

type useTimerHookProps = {
  limit?: number;
};

export const useTimerHook = ({ limit = 60000 }: useTimerHookProps = {}) => {
  const time = useRef(0);
  const prevTime = useRef(0);
  const frame = useRef(0);
  const isRunning = useRef(false);
  const [isExpired, setIsExpired] = useState(false);
  const listeners = useRef(new Set<() => void>());

  const update = () => {
    if (isRunning.current === false) return;

    const currentTime = Date.now();
    const deltaTime = currentTime - prevTime.current;

    prevTime.current = currentTime;
    time.current = time.current + deltaTime;
    notify();

    if (time.current >= limit) {
      setIsExpired(true);
      isRunning.current = false;
      time.current = limit;
      cancelAnimationFrame(frame.current);
      return;
    }

    frame.current = requestAnimationFrame(update);
  };
  const start = () => {
    if (isRunning.current) return;
    setIsExpired(false);
    isRunning.current = true;
    prevTime.current = Date.now() - 1;
    time.current = 0;
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
    cancelAnimationFrame(frame.current);
  };
  const subscribe = useCallback((listener: () => void) => {
    listeners.current.add(listener);
    return () => listeners.current.delete(listener);
  }, []);
  const notify = useCallback(() => {
    listeners.current.forEach((l) => l());
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return {
    isExpired,
    time,
    pause,
    play,
    start,
    stop,
    subscribe,
  };
};
