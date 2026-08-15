import type { ReactNode } from 'react';
import { Button } from '~/components/common';
import { cn } from '~/utils';

type GameOverProps = {
  content?: ReactNode;
  retryGame: () => void;
};

export const GameOver = ({ content, retryGame }: GameOverProps) => {
  return (
    <div
      className={cn(
        // Layout & Overlay
        'z-game-overlay absolute inset-0 grid place-items-center',
        // Background
        'bg-white/90'
      )}
    >
      <div className="grid place-items-center gap-6 rounded-lg">
        <h1 className="text-[10cqw] leading-[1.1] font-bold uppercase">Game over</h1>
        {content && <div className="text-[6cqw]">{content}</div>}
        <Button onClick={retryGame}>Replay</Button>
      </div>
    </div>
  );
};
