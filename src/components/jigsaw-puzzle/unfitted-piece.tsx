import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { Piece } from './piece';
import { puzzleBoardAtom } from './store';

type UnfittedPieceProps = {
  index: number;
  x: number;
  y: number;
  onClick: () => void;
};

export const UnfittedPiece = ({ index, x, y, onClick }: UnfittedPieceProps) => {
  const puzzleBoard = useAtomValue(puzzleBoardAtom);

  if (!puzzleBoard) {
    return null;
  }

  return (
    <button
      className={styles.container}
      style={{
        width: `${puzzleBoard.offsetWidth / 3}px`,
        height: `${puzzleBoard.offsetHeight / 3}px`,
        left: `calc(${x} * 100%)`,
        top: `calc(${y} * 100%)`,
      }}
      onClick={onClick}
    >
      <Piece index={index} />
    </button>
  );
};

const styles = {
  container: css({
    pos: 'absolute',
    top: '0',
    left: '0',
  }),
};
