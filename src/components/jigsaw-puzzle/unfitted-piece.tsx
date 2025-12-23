import { useAtomValue, useSetAtom } from 'jotai';
import { useRef } from 'react';
import { cva } from 'styled-system/css';
import { Piece } from './piece';
import {
  getCursorPositionAtom,
  getGrabIndexAtom,
  getGridAtom,
  grabPieceAtom,
  puzzleBoardAtom,
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
  const cursorPosition = useAtomValue(getCursorPositionAtom);
  const { column, row } = useAtomValue(getGridAtom);
  const grabIndex = useAtomValue(getGrabIndexAtom);
  const pieceRef = useRef<HTMLButtonElement>(null);
  const grabPiece = useSetAtom(grabPieceAtom);
  const setCursorPosition = useSetAtom(setCursorPositionAtom);
  const puzzleBoardElement = useAtomValue(puzzleBoardAtom);

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

  if (!puzzleBoardElement) {
    return null;
  }

  return (
    <button
      ref={pieceRef}
      className={styles.container({ fitted })}
      style={{
        left: `calc(${x} / ${column - 1} * 70% + 15%)`,
        top: `calc(${y} / ${row - 1} * 60% + 20%)`,
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
          width: `${puzzleBoardElement.offsetWidth / column}px`,
          height: `${puzzleBoardElement.offsetHeight / row}px`,
          marginLeft: `calc(-${puzzleBoardElement.offsetWidth / column}px / 2)`,
          marginTop: `calc(-${puzzleBoardElement.offsetHeight / row}px / 2)`,
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
