import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { getPiecesAtom } from './store';
import { UnfittedPiece } from './unfitted-piece';

export const UnfittedPieces = () => {
  const pieces = useAtomValue(getPiecesAtom);

  return (
    <div className={styles.container}>
      {pieces.map((piece) => {
        return (
          <UnfittedPiece
            key={`unfitted-piece-${piece.index}`}
            fitted={piece.fitted}
            index={piece.index}
            x={piece.x}
            y={piece.y}
          />
        );
      })}
    </div>
  );
};

const styles = {
  container: css({
    w: '100%',
    h: '40cqh',
    pos: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
  }),
};
