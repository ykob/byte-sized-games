import { useEffect, useRef, useState } from 'react';
import { Moles } from './moles';

export const Content = () => {
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

  useEffect(() => {
    start();

    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    if (time < 60000) {
      frame.current = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(frame.current);
    }
  }, [time]);

  return (
    <div>
      <div>time: {time}</div>
      <Moles time={time} />
    </div>
  );
};
