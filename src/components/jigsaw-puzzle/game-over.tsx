import { useAtomValue, useSetAtom } from 'jotai';
import { css, cva } from 'styled-system/css';
import { Button } from '../common';
import { getGameCompleteAtom, retryGameAtom } from './store';

export const GameOver = () => {
  const gameComplete = useAtomValue(getGameCompleteAtom);
  const retryGame = useSetAtom(retryGameAtom);

  return (
    <div
      className={styles.container({
        show: gameComplete,
      })}
    >
      <div className={styles.innerContainer}>
        <h1 className={styles.heading}>Game Over</h1>
        <Button onClick={retryGame}>Replay</Button>
      </div>
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
  innerContainer: css({
    width: 'calc(100% - 48px)',
    display: 'grid',
    placeItems: 'center',
    gap: '24px',
    rounded: '8px',
  }),
  heading: css({
    lineHeight: 1.1,
    fontSize: '10cqw',
    color: '#fff',
    fontWeight: 'bold',
  }),
};
