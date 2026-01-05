import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { shuffleArray } from '~/utils';
import { onGameOverAtom } from './game-state';

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

const cardsAtom = atom(shuffleArray(createCards()));
const collectedCardNumbersAtom = atom<number[]>([]);
const selectedCardNumbersAtom = atom([-1, -1]);

// Getter
export const getCardPropsAtom = atomFamily((index: number) => atom((get) => get(cardsAtom)[index]));
export const getCollectedCardNumbersAtom = atom((get) => get(collectedCardNumbersAtom));
export const getSelectedCardNumbersAtom = atom((get) => get(selectedCardNumbersAtom));
export const isMatchedAllCardsAtom = atom((get) => {
  const collectedCardNumbers = get(getCollectedCardNumbersAtom);
  const cards = get(cardsAtom);

  return collectedCardNumbers.length === cards.length / 2;
});

// Setter
export const flipCardAtom = atom(null, (get, set, id: string) => {
  const selectedCardNumbers = get(getSelectedCardNumbersAtom);
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

  const updatedSelectedCardNumbers = get(getSelectedCardNumbersAtom);
  if (updatedSelectedCardNumbers[0] === -1 || updatedSelectedCardNumbers[1] === -1) {
    return;
  }
  if (updatedSelectedCardNumbers[0] === updatedSelectedCardNumbers[1]) {
    set(matchCardsAtom);
    return;
  }
  setTimeout(() => {
    set(backOverCardsAtom);
  }, 500);
});

export const matchCardsAtom = atom(null, (get, set) => {
  const selectedCardNumbers = get(getSelectedCardNumbersAtom);
  const collectedCardNumbers = get(collectedCardNumbersAtom);

  set(collectedCardNumbersAtom, [...collectedCardNumbers, selectedCardNumbers[0]]);
  set(selectedCardNumbersAtom, [-1, -1]);

  const isMatchedAllCards = get(isMatchedAllCardsAtom);

  if (isMatchedAllCards) {
    setTimeout(() => {
      set(onGameOverAtom);
    }, 500);
  }
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
