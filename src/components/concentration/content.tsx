import { useState } from 'react';
import { css } from 'styled-system/css';
import { Card } from './card';

type Card = {
  id: number;
  number: number;
  flipped: boolean;
  disabled: boolean;
};

const shuffleCards = (array: Card[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const baseCards: Card[] = Array.from({ length: 12 }, (_, i) => {
  return {
    id: Math.random(),
    number: Math.floor(i / 2),
    flipped: false,
    disabled: false,
  };
});

export const Content = () => {
  const [cards, setCards] = useState(shuffleCards(baseCards));

  return (
    <div className={styles.container}>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            number={card.number}
            flipped={card.flipped}
            disabled={card.disabled}
            onClick={() => {
              setCards((prevCards) => {
                return prevCards.map((prevCard) => {
                  if (prevCard.id === card.id) {
                    return {
                      ...prevCard,
                      flipped: !prevCard.flipped,
                    };
                  }
                  return prevCard;
                });
              });
            }}
          />
        );
      })}
    </div>
  );
};

const styles = {
  container: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    perspective: '100px',
  }),
};
