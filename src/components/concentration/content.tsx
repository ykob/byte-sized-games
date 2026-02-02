import { useAtomValue, useSetAtom } from 'jotai';
import { GameIntroduction, GameOver } from '~/components/common/';
import { Cards } from './ui';
import { GameProgressWatcher } from './game-progress-watcher';
import { getGameOverAtom, getIsPlayingAtom, retryGameAtom, startGameAtom } from './stores';

export const Content = () => {
  const isPlaying = useAtomValue(getIsPlayingAtom);
  const gameOver = useAtomValue(getGameOverAtom);
  const startGame = useSetAtom(startGameAtom);
  const retryGame = useSetAtom(retryGameAtom);

  return (
    <div>
      <GameProgressWatcher />
      <Cards />
      {!isPlaying && <GameIntroduction title="Concentration" startGame={startGame} />}
      {gameOver && <GameOver retryGame={retryGame} />}
    </div>
  );
};
