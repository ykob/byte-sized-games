import { Button } from '~/components/common';
import { cn } from '~/utils';

type IntroductionProps = {
  title: string;
  startGame: () => void;
};

export const GameIntroduction = ({ title, startGame }: IntroductionProps) => {
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
        <h1 className="text-[10cqw] leading-none font-bold">{title}</h1>
        <Button onClick={startGame}>Start Game</Button>
      </div>
    </div>
  );
};
