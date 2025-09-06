import { css } from 'styled-system/css';
import { shuffleArray } from '~/utils';
import type { Piece as PieceType } from './type';
import { UnfittedPiece } from './unfitted-piece';

type UnfittedPiecesProps = {
  pieces: PieceType[];
};

export const UnfittedPieces = ({ pieces }: UnfittedPiecesProps) => {
  return (
    <div className={styles.container}>
      {shuffleArray(pieces).map((piece) => {
        return (
          <UnfittedPiece
            key={`unfitted-piece-${piece.index}`}
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
