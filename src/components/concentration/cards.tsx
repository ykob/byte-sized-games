import { css } from 'styled-system/css';
import { Card } from './card';

export const Cards = () => {
  const cards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={styles.container}>
      {cards.map((_, index) => {
        return <Card index={index} />;
      })}
    </div>
  );
};

const styles = {
  container: css({
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    placeContent: 'center',
    gap: '8px',
    perspective: '100px',
    px: 'calc(32 / 640 * 100cqw)',
    pos: 'absolute',
    inset: 0,
  }),
};
