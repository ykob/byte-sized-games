import { useAtomValue, useSetAtom } from 'jotai';
import { GameIntroduction, GameOver } from '~/components/common/';
import { retryGameAtom } from '../concentration/stores';
import { getGameOverAtom, getIsPlayingAtom, startGameAtom } from './store';

export const Content = () => {
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const retryGame = useSetAtom(retryGameAtom);

  return (
    <div>
      {!isPlaying && <GameIntroduction title="Avoid & Collect" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
