import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { shuffleArray } from '~/utils';
import { Card } from './card';

type Card = {
  id: number;
  number: number;
  flipped: boolean;
};

const baseCards: Card[] = Array.from({ length: 12 }, (_, i) => {
  return {
    id: Math.random(),
    number: Math.floor(i / 2),
    flipped: false,
  };
});

export const Cards = () => {
  const selectNumbers = useRef<[number, number]>([-1, -1]);
  const collectedNumbers = useRef<number[]>([]);
  const [cards, setCards] = useState<Card[]>(shuffleArray(baseCards));

  const onClickCard = useCallback(
    (id: number) => {
      const thisCard = cards.find((card) => card.id === id);

      if (!thisCard || thisCard.flipped || selectNumbers.current[1] > -1) {
        return;
      }
      selectNumbers.current =
        selectNumbers.current[0] === -1
          ? [thisCard.number, -1]
          : [selectNumbers.current[0], thisCard.number];
      setCards((prevCards) => {
        return prevCards.map((prevCard) => {
          if (prevCard.id === id) {
            return {
              ...prevCard,
              flipped: !prevCard.flipped,
            };
          }
          return prevCard;
        });
      });
    },
    [cards]
  );

  useEffect(() => {
    if (selectNumbers.current[0] === -1 || selectNumbers.current[1] === -1) {
      return;
    }
    if (selectNumbers.current[0] === selectNumbers.current[1]) {
      collectedNumbers.current.push(selectNumbers.current[0]);
      selectNumbers.current = [-1, -1];
    } else {
      setTimeout(() => {
        selectNumbers.current = [-1, -1];
        setCards((prevCards) => {
          return prevCards.map((prevCard) => {
            return {
              ...prevCard,
              flipped: collectedNumbers.current.includes(prevCard.number),
            };
          });
        });
      }, 500);
    }
  }, [selectNumbers.current]);

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
