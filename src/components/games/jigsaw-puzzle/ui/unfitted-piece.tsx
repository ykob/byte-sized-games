import { useAtomValue, useSetAtom } from 'jotai';
import { memo, useEffect, useRef, useState } from 'react';
import { cva } from 'styled-system/css';
import {
  getBoardSizeAtom,
  getGridAtom,
  getIsPeaceGrabbingAtom,
  getPieceCursorPositionAtom,
  getPiecePropsAtom,
  grabPieceAtom,
  setCursorPositionAtom,
} from '../stores';
import { Piece } from './piece';

type UnfittedPieceProps = {
  index: number;
};

const UnfittedPieceComponent = ({ index }: UnfittedPieceProps) => {
  const { column, row } = useAtomValue(getGridAtom);
  const { fitted, x, y } = useAtomValue(getPiecePropsAtom(index));
  const cursorPosition = useAtomValue(getPieceCursorPositionAtom(index));
  const isGrabbing = useAtomValue(getIsPeaceGrabbingAtom(index));
  const boardSize = useAtomValue(getBoardSizeAtom);
  const pieceRef = useRef<HTMLButtonElement>(null);
  const grabPiece = useSetAtom(grabPieceAtom);
  const setCursorPosition = useSetAtom(setCursorPositionAtom);
  const [rect, setRect] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const piece = pieceRef.current;
    if (!piece) return;

    setRect(piece.getBoundingClientRect());
  }, [x, y]);

  const transform = () => {
    if (!isGrabbing) {
      return {
        transform: 'translate3d(0, 0, 0)',
        transition: '0.3s ease-out',
      };
    }

    return {
      transform: `translate3d(${cursorPosition.x - rect.left}px, ${cursorPosition.y - rect.top}px, 0)`,
    };
  };

  return (
    <button
      ref={pieceRef}
      className={styles.container({ fitted, isGrabbing })}
      style={{
        left: `calc(${x} / ${column - 1} * 70% + 15%)`,
        top: `calc(${y} / ${row - 1} * 60% + 20%)`,
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
          width: `${boardSize.width / column}px`,
          height: `${boardSize.height / row}px`,
          marginLeft: `calc(-${boardSize.width / column}px / 2)`,
          marginTop: `calc(-${boardSize.height / row}px / 2)`,
          ...transform(),
        }}
      >
        <Piece index={index} />
      </div>
    </button>
  );
};

export const UnfittedPiece = memo(UnfittedPieceComponent);

const styles = {
  container: cva({
    base: {
      cursor: 'pointer',
      pos: 'absolute',
      top: '0',
      left: '0',
    },
    variants: {
      isGrabbing: {
        true: {
          zIndex: 'game.foreground',
        },
      },
      fitted: {
        true: {
          display: 'none',
        },
        false: {
          opacity: 1,
        },
      },
    },
  }),
};
