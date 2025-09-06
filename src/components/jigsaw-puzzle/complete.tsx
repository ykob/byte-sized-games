import { useAtomValue } from 'jotai';
import { css, cva } from 'styled-system/css';
import { getGameCompleteAtom } from './store';

export const Complete = () => {
  const gameComplete = useAtomValue(getGameCompleteAtom);

  return (
    <div
      className={styles.container({
        show: gameComplete,
      })}
    >
      <div className={styles.message}>Complete</div>
    </div>
  );
};

const styles = {
  container: cva({
    base: {
      pos: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      bgColor: 'rgba(0, 0, 0, 0.5)',
      pointerEvents: 'none',
      zIndex: '9999',
    },
    variants: {
      show: {
        true: {
          opacity: 1,
          pointerEvents: 'auto',
        },
        false: {
          opacity: 0,
          pointerEvents: 'none',
        },
      },
    },
  }),
  message: css({
    fontSize: '10cqw',
    color: '#fff',
    fontWeight: 'bold',
  }),
};
