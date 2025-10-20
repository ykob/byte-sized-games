import { useCallback, useEffect, useRef, useState } from 'react';
import { GameIntroduction } from '~/components/common/';
import { shuffleArray } from '~/utils';
import { Cards, type Card } from './cards';

const baseCards: Card[] = Array.from({ length: 12 }, (_, i) => {
  return {
    id: Math.random(),
    number: Math.floor(i / 2),
    flipped: false,
  };
});

export const Content = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const selectNumbers = useRef<[number, number]>([-1, -1]);
  const collectedNumbers = useRef<number[]>([]);

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
  const startGame = () => {
    setIsPlaying(true);
    setCards(shuffleArray(baseCards));
  };

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
    <div>
      <Cards cards={cards} onClickCard={onClickCard} />
      {!isPlaying && <GameIntroduction title="Concentration" startGame={startGame} />}
    </div>
  );
};
