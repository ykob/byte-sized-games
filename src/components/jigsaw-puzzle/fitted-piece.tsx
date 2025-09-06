import { useSetAtom } from 'jotai';
import { cva } from 'styled-system/css';
import { Piece } from './piece';
import { hoverPieceAtom } from './store';

type FittedPieceProps = {
  fitted: boolean;
  index: number;
};

export const FittedPiece = ({ index, fitted }: FittedPieceProps) => {
  const hoverPiece = useSetAtom(hoverPieceAtom);

  return (
    <div
      className={styles.container({ fitted })}
      onMouseEnter={() => {
        hoverPiece(index);
      }}
      onTouchMove={() => hoverPiece(index)}
    >
      <Piece index={index} />
    </div>
  );
};

const styles = {
  container: cva({
    base: {},
    variants: {
      fitted: {
        true: {
          opacity: 1,
        },
        false: {
          opacity: 0.5,
        },
      },
    },
  }),
};
