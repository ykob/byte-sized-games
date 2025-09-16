type TimerProps = {
  time: number;
};

export const Timer = ({ time }: TimerProps) => {
  return <div>time: {Math.ceil(time / 1000)}</div>;
};
