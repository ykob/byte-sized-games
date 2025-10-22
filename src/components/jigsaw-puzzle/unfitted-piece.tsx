import { useAtomValue, useSetAtom } from 'jotai';
import { useRef } from 'react';
import { cva } from 'styled-system/css';
import { Piece } from './piece';
import {
  cursorPositionAtom,
  getGrabIndexAtom,
  getGridAtom,
  grabPieceAtom,
  puzzleBoardAtom,
} from './store';

type UnfittedPieceProps = {
  fitted: boolean;
  index: number;
  x: number;
  y: number;
  zIndex: number;
};

export const UnfittedPiece = ({ fitted, index, x, y, zIndex }: UnfittedPieceProps) => {
  const cursorPosition = useAtomValue(cursorPositionAtom);
  const { column, row } = useAtomValue(getGridAtom);
  const grabIndex = useAtomValue(getGrabIndexAtom);
  const puzzleBoard = useAtomValue(puzzleBoardAtom);
  const pieceRef = useRef<HTMLButtonElement>(null);
  const grabPiece = useSetAtom(grabPieceAtom);
  const setCursorPosition = useSetAtom(cursorPositionAtom);

  const transform = () => {
    if (!pieceRef.current || grabIndex !== index) {
      return {
        transform: 'translate3d(0, 0, 0)',
        transition: '0.3s ease-out',
      };
    }

    const rect = pieceRef.current.getBoundingClientRect();

    return {
      transform: `translate3d(${cursorPosition.x - rect.left}px, ${cursorPosition.y - rect.top}px, 0)`,
      transition: '0s',
      zIndex: '9999',
    };
  };

  if (!puzzleBoard) {
    return null;
  }

  return (
    <button
      ref={pieceRef}
      className={styles.container({ fitted })}
      style={{
        left: `calc(${x} * 100%)`,
        top: `calc(${y} * 100%)`,
        zIndex: grabIndex === index ? '9999' : zIndex,
        display: fitted ? 'none' : 'block',
      }}
      onMouseDown={() => {
        grabPiece(index);
      }}
      onTouchStart={(event) => {
        grabPiece(index);
        setCursorPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
      }}
    >
      <div
        style={{
          width: `${puzzleBoard.offsetWidth / column}px`,
          height: `${puzzleBoard.offsetHeight / row}px`,
          marginLeft: `calc(-${puzzleBoard.offsetWidth / column}px / 2)`,
          marginTop: `calc(-${puzzleBoard.offsetHeight / row}px / 2)`,
          pointerEvents: grabIndex === index ? 'none' : 'auto',
          ...transform(),
        }}
      >
        <Piece index={index} />
      </div>
    </button>
  );
};

const styles = {
  container: cva({
    base: {
      cursor: 'pointer',
      pos: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'auto',
    },
    variants: {
      fitted: {
        true: {
          opacity: 0,
          pointerEvents: 'none',
        },
        false: {
          opacity: 1,
        },
      },
    },
  }),
};
