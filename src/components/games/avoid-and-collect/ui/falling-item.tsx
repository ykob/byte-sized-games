import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { getFallingItemPropsAtom, type Lane } from '../stores';
import { ExplosionEffect } from './explosion-effect';
import { FallingItemImage } from './falling-item-image';

type Props = {
  index: number;
};

export const FallingItem = ({ index }: Props) => {
  const item = useAtomValue(getFallingItemPropsAtom(index));

  return (
    <div className={styles.container({ x: item.x })}>
      <div
        className={styles.inner}
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

const styles = {
  container: cva('absolute bottom-0', {
    variants: {
      x: {
        0: 'translate-x-[16cqw]',
        1: 'translate-x-[33cqw]',
        2: 'translate-x-[50cqw]',
        3: 'translate-x-[67cqw]',
        4: 'translate-x-[84cqw]',
      } satisfies Record<Lane, string>,
    },
  }),
  inner: 'w-[16cqw] h-[16cqw] absolute -top-[8cqw] -left-[8cqw]',
};
