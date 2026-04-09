import { useAtomValue } from 'jotai';
import { GameIntroduction, GameOver, GameUIContainer } from '~/components/common';
import { useGameManager } from './hooks';
import { getGameOverAtom, getIsPlayingAtom } from './stores';
import { FinalScore, Moles, ScoreView, Timer } from './ui';

export const Content = () => {
  const { handleStartGame, handleResetGame } = useGameManager();
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);

  return (
    <div>
      <GameUIContainer>
        <ScoreView />
        <Timer />
      </GameUIContainer>
      <Moles />
      {!isPlaying && <GameIntroduction title="Whac a Mole" startGame={handleStartGame} />}
      {gameOver && <GameOver content={<FinalScore />} retryGame={handleResetGame} />}
    </div>
  );
};
