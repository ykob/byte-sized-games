import { atom } from 'jotai';
import { shuffleArray } from '~/utils';

type Card = {
  id: number;
  number: number;
  flipped: boolean;
};

const createCards = (): Card[] => {
  return Array.from({ length: 12 }, (_, i) => {
    return {
      id: Math.random(),
      number: Math.floor(i / 2),
      flipped: false,
    };
  });
};

const cardsAtom = atom(shuffleArray(createCards()));
const collectedCardNumbersAtom = atom<number[]>([]);
const selectedCardNumbersAtom = atom([-1, -1]);

// Getter
export const getCardsAtom = atom((get) => get(cardsAtom));
export const getCollectedCardNumbersAtom = atom((get) => get(collectedCardNumbersAtom));
export const getSelectedCardNumbersAtom = atom((get) => get(selectedCardNumbersAtom));
export const isMatchedAllCardsAtom = atom((get) => {
  const collectedCardNumbers = get(getCollectedCardNumbersAtom);
  const cards = get(getCardsAtom);

  return collectedCardNumbers.length === cards.length / 2;
});

// Setter
export const flipCardAtom = atom(null, (get, set, id: number) => {
  const selectedCardNumbers = get(getSelectedCardNumbersAtom);
  const previousCards = get(getCardsAtom);
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
  const selectedCardNumbers = get(getSelectedCardNumbersAtom);
  const collectedCardNumbers = get(collectedCardNumbersAtom);

  set(collectedCardNumbersAtom, [...collectedCardNumbers, selectedCardNumbers[0]]);
  set(selectedCardNumbersAtom, [-1, -1]);
});

export const backOverCardsAtom = atom(null, (get, set) => {
  const previousCards = get(getCardsAtom);
  const collectedCardNumbers = get(collectedCardNumbersAtom);

  set(
    cardsAtom,
    previousCards.map((prevCard) => {
      return {
        ...prevCard,
        flipped: collectedCardNumbers.includes(prevCard.number),
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
