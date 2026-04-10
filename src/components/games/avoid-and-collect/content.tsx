import { useAtomValue } from 'jotai';
import { GameIntroduction, GameOver, GameUIContainer } from '~/components/common';
import { useGameManager, useKeyMove } from './hooks';
import { getGameOverAtom, getIsPlayingAtom } from './stores';
import { Catcher, FallingItems, FinalScore, LifeView, MoveButtons, ScoreView } from './ui';

export const Content = () => {
  useKeyMove();
  const { handleStartGame, handleRetryGame } = useGameManager();
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);

  return (
    <div>
      <GameUIContainer>
        <LifeView />
        <ScoreView />
      </GameUIContainer>
      <FallingItems />
      <Catcher />
      <MoveButtons />
      {!isPlaying && <GameIntroduction title="Avoid & Collect" startGame={handleStartGame} />}
      {gameOver && <GameOver content={<FinalScore />} retryGame={handleRetryGame} />}
    </div>
  );
};
