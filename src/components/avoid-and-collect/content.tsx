import { useAtomValue } from 'jotai';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useGameManager, useKeyMove } from './hooks';
import { getGameOverAtom, getIsPlayingAtom } from './stores';
import { Catcher, FallingItems, LifeView, MoveButtons, ScoreView } from './ui';

export const Content = () => {
  useKeyMove();
  const { handleStartGame, handleRetryGame } = useGameManager();
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);

  return (
    <div>
      <LifeView />
      <ScoreView />
      <FallingItems />
      <Catcher />
      <MoveButtons />
      {!isPlaying && <GameIntroduction title="Avoid & Collect" startGame={handleStartGame} />}
      {gameOver && <GameOver retryGame={handleRetryGame} />}
    </div>
  );
};
