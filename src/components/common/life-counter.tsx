import { cn } from '~/utils';
import { LifeMarker } from './life-marker';

type Props = {
  className?: string;
  current: number;
  max: 3 | 4 | 5;
};

export const LifeCounter = ({ className, current, max }: Props) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(max)].map((_, index) => {
        return <LifeMarker key={index} lost={index >= current} />;
      })}
    </div>
  );
};
