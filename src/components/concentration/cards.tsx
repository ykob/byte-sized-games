import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { css } from 'styled-system/css';
import { Card } from './card';
import {
  backOverCardsAtom,
  flipCardAtom,
  getCardsAtom,
  getCollectedCardNumbersAtom,
  getSelectedCardNumbersAtom,
  matchCardsAtom,
  onGameOverAtom,
} from './stores';

export const Cards = () => {
  const cards = useAtomValue(getCardsAtom);
  const collectedNumbers = useAtomValue(getCollectedCardNumbersAtom);
  const selectedCardNumbers = useAtomValue(getSelectedCardNumbersAtom);
  const flipCard = useSetAtom(flipCardAtom);
  const matchCards = useSetAtom(matchCardsAtom);
  const backOverCards = useSetAtom(backOverCardsAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (selectedCardNumbers[0] === -1 || selectedCardNumbers[1] === -1) {
      return;
    }
    if (selectedCardNumbers[0] === selectedCardNumbers[1]) {
      matchCards();
      return;
    }
    setTimeout(() => {
      backOverCards();
    }, 500);
  }, [selectedCardNumbers]);

  useEffect(() => {
    if (collectedNumbers.length === 6) {
      setTimeout(() => {
        onGameOver();
      }, 500);
    }
  }, [collectedNumbers]);

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
