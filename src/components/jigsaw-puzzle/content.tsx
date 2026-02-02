import { useAtomValue } from 'jotai';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useGameManager } from './hooks';
import { getGameOverAtom, getIsPlayingAtom } from './stores';
import { PuzzleBoard, Timer, UnfittedPieces } from './ui';

export const Content = () => {
  const { limit, handleStartGame, handleRetryGame } = useGameManager();
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);

  return (
    <div>
      <PuzzleBoard />
      <UnfittedPieces />
      <Timer limit={limit} />
      {!isPlaying && <GameIntroduction title="Jigsaw Puzzle" startGame={handleStartGame} />}
      {gameOver && <GameOver retryGame={handleRetryGame} />}
    </div>
  );
};
