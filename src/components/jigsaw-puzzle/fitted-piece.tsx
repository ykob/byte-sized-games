import { useAtomValue } from 'jotai';
import { memo, useRef } from 'react';
import { css, cva } from 'styled-system/css';
import { Piece } from './piece';
import {
  getBoardSizeAtom,
  getGridAtom,
  getIsPeaceGrabbingAtom,
  getPieceCursorPositionAtom,
  getPiecePropsAtom,
} from './stores';

type FittedPieceProps = {
  index: number;
};

const FittedPieceComponent = ({ index }: FittedPieceProps) => {
  const { column, row } = useAtomValue(getGridAtom);
  const { fitted } = useAtomValue(getPiecePropsAtom(index));
  const cursorPosition = useAtomValue(getPieceCursorPositionAtom(index));
  const isGrabbing = useAtomValue(getIsPeaceGrabbingAtom(index));
  const boardSize = useAtomValue(getBoardSizeAtom);
  const pieceRef = useRef<HTMLDivElement>(null);
  const rect = pieceRef.current ? pieceRef.current.getBoundingClientRect() : { left: 0, top: 0 };

  const transform = () => {
    if (!isGrabbing) {
      return {
        transform: 'translate3d(0, 0, 0)',
        transition: '0.1s ease-out',
      };
    }

    const x = cursorPosition.x - rect.left - boardSize.width / 2 / column;
    const y = cursorPosition.y - rect.top - boardSize.height / 2 / row;

    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition: '0s',
      zIndex: '9999',
    };
  };

  return (
    <div data-piece-index={index} ref={pieceRef} className={styles.container({ fitted })}>
      <div
        className={styles.innerContainer}
        style={{
          ...transform(),
        }}
      >
        <Piece index={index} />
      </div>
    </div>
  );
};

export const FittedPiece = memo(FittedPieceComponent);

const styles = {
  container: cva({
    base: {
      zIndex: 2,
      pos: 'relative',
    },
    variants: {
      fitted: {
        true: {
          opacity: 1,
        },
        false: {
          opacity: 0,
        },
      },
    },
  }),
  innerContainer: css({
    w: '100%',
    h: '100%',
    color: '#fff',
  }),
};
