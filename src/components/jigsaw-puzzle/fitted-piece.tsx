import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import { css, cva } from 'styled-system/css';
import { Piece } from './piece';
import {
  getGrabIndexAtom,
  getGridAtom,
  getPieceCursorPositionAtom,
  getPuzzleBoardAtom,
} from './stores';

type FittedPieceProps = {
  fitted: boolean;
  index: number;
};

export const FittedPiece = ({ index, fitted }: FittedPieceProps) => {
  const cursorPosition = useAtomValue(getPieceCursorPositionAtom(index));
  const { column, row } = useAtomValue(getGridAtom);
  const grabIndex = useAtomValue(getGrabIndexAtom);
  const puzzleBoard = useAtomValue(getPuzzleBoardAtom);
  const pieceRef = useRef<HTMLDivElement>(null);
  const rect = pieceRef.current ? pieceRef.current.getBoundingClientRect() : { left: 0, top: 0 };

  const transform = () => {
    if (grabIndex !== index || !puzzleBoard) {
      return {
        transform: 'translate3d(0, 0, 0)',
        transition: '0.1s ease-out',
      };
    }

    const x = cursorPosition.x - rect.left - puzzleBoard.offsetWidth / 2 / column;
    const y = cursorPosition.y - rect.top - puzzleBoard.offsetHeight / 2 / row;

    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition: '0s',
      zIndex: '9999',
    };
  };

  if (!puzzleBoard) {
    return null;
  }

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
