import type { ReactNode } from 'react';
import { Button } from '~/components/common';

type GameOverProps = {
  content?: ReactNode;
  retryGame: () => void;
};

export const GameOver = ({ content, retryGame }: GameOverProps) => {
  return (
    <div className="absolute inset-0 grid place-items-center bg-white/90 z-game-overlay">
      <div className="grid place-items-center gap-6 rounded-lg">
        <h1 className="leading-[1.1] text-[10cqw] font-bold uppercase">Game over</h1>
        {content && <div className="text-[6cqw]">{content}</div>}
        <Button onClick={retryGame}>Replay</Button>
      </div>
    </div>
  );
};
