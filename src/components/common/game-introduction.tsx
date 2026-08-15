import { Button } from '~/components/common';

type IntroductionProps = {
  title: string;
  startGame: () => void;
};

export const GameIntroduction = ({ title, startGame }: IntroductionProps) => {
  return (
    <div className="absolute inset-0 grid place-items-center bg-white/90 z-game-overlay">
      <div className="grid place-items-center gap-6 rounded-lg">
        <h1 className="leading-none text-[10cqw] font-bold">{title}</h1>
        <Button onClick={startGame}>Start Game</Button>
      </div>
    </div>
  );
};
