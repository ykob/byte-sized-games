import { useAtomValue } from 'jotai';
import { GameIntroduction, GameOver, GameUIContainer } from '~/components/common';
import { useGameManager, usePuzzleDrag } from './hooks';
import { getGameOverAtom, getIsPlayingAtom } from './stores';
import { PuzzleBoard, Timer, UnfittedPieces } from './ui';

export const Content = () => {
  const { limit, handleStartGame, handleRetryGame } = useGameManager();
  usePuzzleDrag();
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);

  return (
    <div>
      <PuzzleBoard />
      <UnfittedPieces />
      <GameUIContainer>
        <Timer limit={limit} />
      </GameUIContainer>
      {!isPlaying && <GameIntroduction title="Jigsaw Puzzle" startGame={handleStartGame} />}
      {gameOver && <GameOver retryGame={handleRetryGame} />}
    </div>
  );
};
