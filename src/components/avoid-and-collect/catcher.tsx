import { useAtomValue } from 'jotai';
import { cva } from 'styled-system/css';
import { getCatcherPositionXAtom, type Lane } from './store';

export const Catcher = () => {
  const positionX = useAtomValue(getCatcherPositionXAtom);

  return <div className={styles.container({ positionX })}>Catcher</div>;
};

const styles = {
  container: cva({
    base: {},
    variants: {
      positionX: {
        0: {
          transform: 'translate3d(-100%, 0, 0)',
        },
        1: {
          transform: 'translate3d(0, 0, 0)',
        },
        2: {
          transform: 'translate3d(0, 0, 0)',
        },
        3: {
          transform: 'translate3d(0, 0, 0)',
        },
        4: {
          transform: 'translate3d(0, 0, 0)',
        },
      } satisfies Record<Lane, { transform: string }>,
    },
  }),
};
