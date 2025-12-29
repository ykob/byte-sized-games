import { useAtomValue, useSetAtom } from 'jotai';
import { useRef } from 'react';
import { cva } from 'styled-system/css';
import { Piece } from './piece';
import {
  getGridAtom,
  getIsPeaceGrabbingAtom,
  getPieceCursorPositionAtom,
  getPuzzleBoardAtom,
  grabPieceAtom,
  setCursorPositionAtom,
} from './stores';

type UnfittedPieceProps = {
  fitted: boolean;
  index: number;
  x: number;
  y: number;
  zIndex: number;
};

export const UnfittedPiece = ({ fitted, index, x, y, zIndex }: UnfittedPieceProps) => {
  const { column, row } = useAtomValue(getGridAtom);
  const cursorPosition = useAtomValue(getPieceCursorPositionAtom(index));
  const isGrabbing = useAtomValue(getIsPeaceGrabbingAtom(index));
  const puzzleBoard = useAtomValue(getPuzzleBoardAtom);
  const pieceRef = useRef<HTMLButtonElement>(null);
  const grabPiece = useSetAtom(grabPieceAtom);
  const setCursorPosition = useSetAtom(setCursorPositionAtom);
  const rect = pieceRef.current ? pieceRef.current.getBoundingClientRect() : { left: 0, top: 0 };

  const transform = () => {
    if (!isGrabbing) {
      return {
        transform: 'translate3d(0, 0, 0)',
        transition: '0.3s ease-out',
      };
    }

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
        left: `calc(${x} / ${column - 1} * 70% + 15%)`,
        top: `calc(${y} / ${row - 1} * 60% + 20%)`,
        zIndex: isGrabbing ? '9999' : zIndex,
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
          pointerEvents: isGrabbing ? 'none' : 'auto',
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
