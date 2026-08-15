import type { ReactNode } from 'react';
import { Button } from '~/components/common';

type GameOverProps = {
  content?: ReactNode;
  retryGame: () => void;
};

export const GameOver = ({ content, retryGame }: GameOverProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.heading}>Game over</h1>
        {content && <div className={styles.content}>{content}</div>}
        <Button onClick={retryGame}>Replay</Button>
      </div>
    </div>
  );
};

const styles = {
  container: 'absolute inset-0 grid place-items-center bg-white/90 z-z-game-overlay',
  innerContainer: 'grid place-items-center gap-6 rounded-lg',
  heading: 'leading-[1.1] text-[10cqw] font-bold uppercase',
  content: 'text-[6cqw]',
};
