import { useAtomValue } from 'jotai';
import { cn } from '~/utils';
import { getFallingItemPropsAtom, type Lane } from '../stores';
import { ExplosionEffect } from './explosion-effect';
import { FallingItemImage } from './falling-item-image';

type Props = {
  index: number;
};

const lanePositionClasses: Record<Lane, string> = {
  0: 'translate-x-[16cqw]',
  1: 'translate-x-[33cqw]',
  2: 'translate-x-[50cqw]',
  3: 'translate-x-[67cqw]',
  4: 'translate-x-[84cqw]',
};

export const FallingItem = ({ index }: Props) => {
  const item = useAtomValue(getFallingItemPropsAtom(index));

  return (
    <div className={cn('absolute bottom-0', lanePositionClasses[item.x])}>
      <div
        className="w-[16cqw] h-[16cqw] absolute -top-[8cqw] -left-[8cqw]"
        style={{
          transform: `translate3d(0, ${item.y}cqh, 0)`,
        }}
      >
        <FallingItemImage hit={item.hit} type={item.type} />
        {item.type === 'FAULT' && item.hit === true && <ExplosionEffect />}
      </div>
    </div>
  );
};
