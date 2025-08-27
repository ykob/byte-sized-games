import { useState } from 'react';
import { css } from 'styled-system/css';
import { Card } from './card';

const baseCards = Array.from({ length: 12 }, () => {
  return {
    id: Math.random(),
    flipped: false,
    disabled: false,
  };
});

export const Content = () => {
  const [cards, setCards] = useState(baseCards);

  return (
    <div className={styles.container}>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
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
