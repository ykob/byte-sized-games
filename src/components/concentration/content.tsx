import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { Cards } from './cards';
import {
  backOverCardsAtom,
  getCollectedCardNumbersAtom,
  getGameOverAtom,
  getIsPlayingAtom,
  getSelectedCardNumbersAtom,
  isMatchedAllCardsAtom,
  matchCardsAtom,
  onGameOverAtom,
  retryGameAtom,
  startGameAtom,
} from './stores';

export const Content = () => {
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const retryGame = useSetAtom(retryGameAtom);

  const collectedNumbers = useAtomValue(getCollectedCardNumbersAtom);
  const selectedCardNumbers = useAtomValue(getSelectedCardNumbersAtom);
  const isMatchedAllCards = useAtomValue(isMatchedAllCardsAtom);
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
    if (isMatchedAllCards) {
      setTimeout(() => {
        onGameOver();
      }, 500);
    }
  }, [collectedNumbers]);

  return (
    <div>
      <Cards />
      {!isPlaying && <GameIntroduction title="Concentration" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
