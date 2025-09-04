import { css } from 'styled-system/css';
import { Piece } from './piece';

export type Piece = {
  id: number;
  x: number;
  y: number;
  fitted: boolean;
};

type PiecesProps = {
  pieces: Piece[];
  onClickPiece: (id: number) => void;
};

export const Pieces = ({ pieces, onClickPiece }: PiecesProps) => {
  return (
    <div className={styles.container}>
      {pieces.map((card) => {
        return (
          <Piece
            key={card.id}
            onClick={() => {
              onClickPiece(card.id);
            }}
          />
        );
      })}
    </div>
  );
};

const styles = {
  container: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    perspective: '100px',
  }),
};
