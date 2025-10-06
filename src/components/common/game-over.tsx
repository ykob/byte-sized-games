import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Button } from '~/components/common';

type GameOverProps = {
  content?: ReactNode;
  retryGame: () => void;
};

export const GameOver = ({ content, retryGame }: GameOverProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.heading}>Game Over</h1>
        {content && <div className={styles.content}>{content}</div>}
        <Button onClick={retryGame}>Replay</Button>
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
    bgColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: '9999',
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
    fontWeight: 'bold',
  }),
  content: css({
    fontSize: '10cqw',
    fontWeight: 'bold',
  }),
};
