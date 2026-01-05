import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameIntroduction, GameOver } from '~/components/common/';
import { Cards } from './cards';
import {
  backOverCardsAtom,
  getGameOverAtom,
  getIsPlayingAtom,
  getSelectedCardNumbersAtom,
  matchCardsAtom,
  retryGameAtom,
  startGameAtom,
} from './stores';

export const Content = () => {
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const retryGame = useSetAtom(retryGameAtom);

  const selectedCardNumbers = useAtomValue(getSelectedCardNumbersAtom);
  const matchCards = useSetAtom(matchCardsAtom);
  const backOverCards = useSetAtom(backOverCardsAtom);

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

  return (
    <div>
      <Cards />
      {!isPlaying && <GameIntroduction title="Concentration" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
