import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { Button } from '../common';
import { getScoreAtom } from './store';

type GameOverProps = {
  retryGame: () => void;
};

export const GameOver = ({ retryGame }: GameOverProps) => {
  const score = useAtomValue(getScoreAtom);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.heading}>Game Over</h1>
        <p>Score: {score}</p>
        <Button onClick={retryGame}>Retry Game</Button>
      </div>
    </div>
  );
};

const styles = {
  container: css({
    pos: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    bgColor: 'rgba(255, 255, 255, 0.3)',
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
    fontSize: '3rem',
  }),
};
