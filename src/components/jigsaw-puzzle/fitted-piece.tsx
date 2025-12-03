import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import { css, cva } from 'styled-system/css';
import { Piece } from './piece';
import { getCursorPositionAtom, getGrabIndexAtom, getGridAtom, puzzleBoardAtom } from './stores';

type FittedPieceProps = {
  fitted: boolean;
  index: number;
};

export const FittedPiece = ({ index, fitted }: FittedPieceProps) => {
  const cursorPosition = useAtomValue(getCursorPositionAtom);
  const { column, row } = useAtomValue(getGridAtom);
  const grabIndex = useAtomValue(getGrabIndexAtom);
  const puzzleBoard = useAtomValue(puzzleBoardAtom);
  const pieceRef = useRef<HTMLDivElement>(null);

  const transform = () => {
    if (!pieceRef.current || grabIndex !== index || !puzzleBoard) {
      return {
        transform: 'translate3d(0, 0, 0)',
        transition: '0.1s ease-out',
      };
    }

    const rect = pieceRef.current.getBoundingClientRect();
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
    base: {},
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
