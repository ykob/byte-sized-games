import { useAtomValue, useSetAtom } from 'jotai';
import { css } from 'styled-system/css';
import { Card } from './card';
import { flipCardAtom, getCardsAtom } from './stores';

export const Cards = () => {
  const cards = useAtomValue(getCardsAtom);
  const flipCard = useSetAtom(flipCardAtom);

  return (
    <div className={styles.container}>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            number={card.number}
            flipped={card.flipped}
            onClick={() => {
              flipCard(card.id);
            }}
          />
        );
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
