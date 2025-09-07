import { useEffect, useRef, useState } from 'react';

export const useTimeHook = () => {
  const [time, setTime] = useState(0);
  const prevTime = useRef(0);
  const frame = useRef(0);

  const update = () => {
    const currentTime = Date.now();
    const deltaTime = currentTime - prevTime.current;

    prevTime.current = currentTime;
    setTime((time) => time + deltaTime);
  };
  const start = () => {
    prevTime.current = Date.now();
    frame.current = requestAnimationFrame(update);
  };
  const pause = () => {
    cancelAnimationFrame(frame.current);
  };
  const play = () => {
    frame.current = requestAnimationFrame(update);
  };
  const stop = () => {
    cancelAnimationFrame(frame.current);
    setTime(0);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, []);
  useEffect(() => {
    if (frame.current === 0) return;
    if (time < 60000) {
      frame.current = requestAnimationFrame(update);
    } else {
      frame.current = Math.min(time, 60000);
      cancelAnimationFrame(frame.current);
    }
  }, [time]);

  return {
    pause,
    play,
    start,
    stop,
    time,
  };
};
