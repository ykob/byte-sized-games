import { useAtomValue, useSetAtom } from 'jotai';
import { GameIntroduction, GameOver } from '~/components/common/';
import { useTimer } from '~/hooks';
import { Catcher } from './catcher';
import { FallingItems } from './falling-items';
import { MoveButtons } from './move-buttons';
import {
  getGameOverAtom,
  getIsPlayingAtom,
  resetGameAtom,
  startGameAtom,
  updateFallingItemsAtom,
} from './store';

export const Content = () => {
  const updateFallingItems = useSetAtom(updateFallingItemsAtom);
  const { start: startTimer } = useTimer({
    update: updateFallingItems,
  });
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);

  return (
    <div>
      <FallingItems />
      <Catcher />
      <MoveButtons />
      {!isPlaying && (
        <GameIntroduction
          title="Avoid & Collect"
          startGame={() => {
            startGame();
            startTimer();
          }}
        />
      )}
      {gameOver && (
        <GameOver
          retryGame={() => {
            resetGame();
            startTimer();
          }}
        />
      )}
    </div>
  );
};
