type TimerProps = {
  time: number;
};

export const Timer = ({ time }: TimerProps) => {
  return <div>time: {time}</div>;
};
