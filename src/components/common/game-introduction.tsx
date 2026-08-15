import { Button } from '~/components/common';

type IntroductionProps = {
  title: string;
  startGame: () => void;
};

export const GameIntroduction = ({ title, startGame }: IntroductionProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.heading}>{title}</h1>
        <Button onClick={startGame}>Start Game</Button>
      </div>
    </div>
  );
};

const styles = {
  container: 'absolute inset-0 grid place-items-center bg-white/90 z-game-overlay',
  innerContainer: 'grid place-items-center gap-6 rounded-lg',
  heading: 'leading-none text-[10cqw] font-bold',
};
