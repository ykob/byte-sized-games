import { css } from 'styled-system/css';
import { Card } from './card';

export type Card = {
  id: number;
  number: number;
  flipped: boolean;
};

type CardsProps = {
  cards: Card[];
  onClickCard: (id: number) => void;
};

export const Cards = ({ cards, onClickCard }: CardsProps) => {
  return (
    <div className={styles.container}>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            number={card.number}
            flipped={card.flipped}
            onClick={() => {
              onClickCard(card.id);
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
