import { css } from 'styled-system/css';
import type { Piece as PieceType } from './type';
import { UnfittedPiece } from './unfitted-piece';

type UnfittedPiecesProps = {
  pieces: PieceType[];
  onClickPiece: (id: number) => void;
};

export const UnfittedPieces = ({ pieces, onClickPiece }: UnfittedPiecesProps) => {
  return (
    <div className={styles.container}>
      {pieces.map((piece) => {
        return (
          <UnfittedPiece
            key={piece.id}
            index={piece.index}
            x={piece.x}
            y={piece.y}
            onClick={() => {
              onClickPiece(piece.id);
            }}
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
