import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';
import { shuffleArray } from '~/utils';

type Card = {
  id: string;
  number: number;
  flipped: boolean;
};

const createCards = (): Card[] => {
  return Array.from({ length: 12 }, (_, i) => {
    return {
      id: `card-id-${i}`,
      number: Math.floor(i / 2),
      flipped: false,
    };
  });
};

export const cardsAtom = atom(shuffleArray(createCards()));
export const collectedCardNumbersAtom = atom<number[]>([]);
export const selectedCardNumbersAtom = atom([-1, -1]);

// Getter
export const getCardPropsAtom = atomFamily((index: number) => atom((get) => get(cardsAtom)[index]));

export const isMatchedAllCardsAtom = atom((get) => {
  const collectedCardNumbers = get(collectedCardNumbersAtom);
  const cards = get(cardsAtom);

  return collectedCardNumbers.length === cards.length / 2;
});

// Setter
export const flipCardAtom = atom(null, (get, set, id: string) => {
  const selectedCardNumbers = get(selectedCardNumbersAtom);
  const previousCards = get(cardsAtom);
  const thisCard = previousCards.find((card) => card.id === id);

  if (!thisCard || thisCard.flipped || selectedCardNumbers[1] > -1) {
    return;
  }

  set(
    cardsAtom,
    previousCards.map((prevCard) => {
      if (prevCard.id === thisCard.id) {
        return {
          ...prevCard,
          flipped: !prevCard.flipped,
        };
      }
      return prevCard;
    })
  );

  set(
    selectedCardNumbersAtom,
    selectedCardNumbers[0] === -1
      ? [thisCard.number, -1]
      : [selectedCardNumbers[0], thisCard.number]
  );
});

export const matchCardsAtom = atom(null, (get, set) => {
  const selectedCardNumbers = get(selectedCardNumbersAtom);
  const collectedCardNumbers = get(collectedCardNumbersAtom);

  set(collectedCardNumbersAtom, [...collectedCardNumbers, selectedCardNumbers[0]]);
  set(selectedCardNumbersAtom, [-1, -1]);
});

export const backOverCardsAtom = atom(null, (get, set) => {
  const previousCards = get(cardsAtom);
  const collectedCardNumbers = get(collectedCardNumbersAtom);

  set(
    cardsAtom,
    previousCards.map((prevCard) => {
      const nextFlipped = collectedCardNumbers.includes(prevCard.number);
      if (prevCard.flipped === nextFlipped) {
        return prevCard;
      }
      return {
        ...prevCard,
        flipped: nextFlipped,
      };
    })
  );
  set(selectedCardNumbersAtom, [-1, -1]);
});

export const resetCardsAtom = atom(null, (_, set) => {
  set(collectedCardNumbersAtom, []);
  set(selectedCardNumbersAtom, [-1, -1]);
  set(cardsAtom, shuffleArray(createCards()));
});
