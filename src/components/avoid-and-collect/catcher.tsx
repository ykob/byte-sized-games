import { useAtomValue } from 'jotai';
import { css, cva } from 'styled-system/css';
import { getCatcherPositionXAtom, type Lane } from './store';

export const Catcher = () => {
  const positionX = useAtomValue(getCatcherPositionXAtom);

  return (
    <div className={styles.container}>
      <div className={styles.marker({ positionX })}></div>
    </div>
  );
};

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    pos: 'absolute',
    inset: 'auto 0 calc(64px + 3.2rem + 5cqw)',
  }),
  marker: cva({
    base: {
      w: '10cqw',
      h: '10cqw',
      pos: 'absolute',
      top: '-5cqw',
      left: '-5cqw',
      bgColor: '#000',
      transition: 'transform 0.1s ease-out',
    },
    variants: {
      positionX: {
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
};
