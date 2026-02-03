import { useAtomValue } from 'jotai';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useGameManager } from './hooks';
import { getGameOverAtom, getIsPlayingAtom } from './stores';
import { Cards } from './ui';

export const Content = () => {
  const { handleStartGame, handleRetryGame } = useGameManager();
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);

  return (
    <div>
      <Cards />
      {!isPlaying && <GameIntroduction title="Concentration" startGame={handleStartGame} />}
      {gameOver && <GameOver retryGame={handleRetryGame} />}
    </div>
  );
};
