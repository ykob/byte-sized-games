import { mdiTimer } from '@mdi/js';
import Icon from '@mdi/react';
import { zeroPadding } from '~/utils';

type TimerProps = {
  time: number;
};

export const Timer = ({ time }: TimerProps) => {
  const second = Math.floor(time / 1000);
  const millisecond = Math.floor((time - second * 1000) / 10);

  return (
    <div className="flex items-center">
      <Icon path={mdiTimer} size={2} />
      <div className="text-3xl leading-none font-medium">
        {second}.{zeroPadding(millisecond, 2)}
      </div>
    </div>
  );
};
