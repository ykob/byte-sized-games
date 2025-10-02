import { css } from 'styled-system/css';
import { Button } from '.';

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
  container: css({
    pos: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    bgColor: 'rgba(255, 255, 255, 0.9)',
  }),
  innerContainer: css({
    width: 'calc(100% - 48px)',
    display: 'grid',
    placeItems: 'center',
    gap: '24px',
    rounded: '8px',
  }),
  heading: css({
    lineHeight: 1,
    fontSize: '10cqw',
    fontWeight: 'bold',
  }),
};
