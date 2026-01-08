import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  backOverCardsAtom,
  isMatchedAllCardsAtom,
  matchCardsAtom,
  onGameOverAtom,
  selectedCardNumbersAtom,
} from './stores';

export const GameProgressWatcher = () => {
  const selectedCardNumbers = useAtomValue(selectedCardNumbersAtom);
  const matchCards = useSetAtom(matchCardsAtom);
  const backOverCards = useSetAtom(backOverCardsAtom);

  useEffect(() => {
    if (selectedCardNumbers[1] === -1) {
      return;
    }

    if (selectedCardNumbers[0] === selectedCardNumbers[1]) {
      matchCards();
    } else {
      setTimeout(() => {
        backOverCards();
      }, 500);
    }
  }, [selectedCardNumbers, matchCards, backOverCards]);

  const isMatchedAllCards = useAtomValue(isMatchedAllCardsAtom);
  const onGameOver = useSetAtom(onGameOverAtom);

  useEffect(() => {
    if (isMatchedAllCards) {
      setTimeout(() => {
        onGameOver();
      }, 500);
    }
  }, [isMatchedAllCards, onGameOver]);

  return null;
};
