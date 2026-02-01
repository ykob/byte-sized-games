import { useAtomValue } from 'jotai';
import { GameIntroduction, GameOver } from '~/components/common/';
import { Catcher } from './catcher';
import { FallingItems } from './falling-items';
import { useGameManager, useKeyMove } from './hooks';
import { LifeView } from './life-view';
import { MoveButtons } from './move-buttons';
import { ScoreView } from './score-view';
import { getGameOverAtom, getIsPlayingAtom } from './store';

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
      {!isPlaying && (
        <GameIntroduction
          title="Avoid & Collect"
          startGame={handleStartGame}
        />
      )}
      {gameOver && <GameOver retryGame={handleRetryGame} />}
    </div>
  );
};
