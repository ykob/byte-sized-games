import { useAtomValue } from 'jotai';
import { css, cva } from 'styled-system/css';
import { getFallingItemPropsAtom, type Lane } from './store';

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
      ></div>
    </div>
  );
};

const styles = {
  container: cva({
    base: {
      pos: 'absolute',
      bottom: '0',
    },
    variants: {
      x: {
        0: {
          transform: 'translate3d(16cqw, 0, 0)',
        },
        1: {
          transform: 'translate3d(33cqw, 0, 0)',
        },
        2: {
          transform: 'translate3d(50cqw, 0, 0)',
        },
        3: {
          transform: 'translate3d(67cqw, 0, 0)',
        },
        4: {
          transform: 'translate3d(84cqw, 0, 0)',
        },
      } satisfies Record<Lane, { transform: string }>,
    },
  }),
  inner: css({
    w: '10cqw',
    h: '10cqw',
    pos: 'absolute',
    top: '-5cqw',
    left: '-5cqw',
    bgColor: '#000',
  }),
};
