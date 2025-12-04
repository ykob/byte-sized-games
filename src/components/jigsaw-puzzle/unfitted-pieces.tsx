import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { getPiecesAtom } from './stores';
import { UnfittedPiece } from './unfitted-piece';

export const UnfittedPieces = () => {
  const pieces = useAtomValue(getPiecesAtom);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {pieces.map((piece) => {
          return (
            <UnfittedPiece
              key={`unfitted-piece-${piece.index}`}
              fitted={piece.fitted}
              index={piece.index}
              x={piece.x}
              y={piece.y}
              zIndex={piece.zIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: css({
    w: '100%',
    h: '50cqh',
    boxSizing: 'border-box',
    pos: 'absolute',
    bottom: '0',
    right: '0',
    left: '0'
  }),
  innerContainer: css({
    w: '100%',
    h: '100%',
    pos: 'absolute',
    top: 0,
  }),
};
