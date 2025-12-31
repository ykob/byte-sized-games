import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { css } from 'styled-system/css';
import illust from '~/assets/img/jigsaw-puzzle/illust.png';
import { FittedPiece } from './fitted-piece';
import { getGridAtom, setBoardSizeAtom } from './stores';

export const PuzzleBoard = () => {
  const { row, column } = useAtomValue(getGridAtom);
  const setBoardSize = useSetAtom(setBoardSizeAtom);
  const boardRef = useRef<HTMLDivElement>(null);
  const pieceIndices = Array.from({ length: row * column }, (_, i) => i);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    setBoardSize({ width: board.offsetWidth, height: board.offsetHeight });

    const observer = new ResizeObserver(() => {
      setBoardSize({ width: board.offsetWidth, height: board.offsetHeight });
    });

    observer.observe(board);

    return () => {
      observer.disconnect();
    };
  }, [setBoardSize]);

  return (
    <div className={styles.container}>
      <div
        className={styles.innerContainer}
        ref={boardRef}
        style={{
          gridTemplateColumns: `repeat(${column}, 1fr)`,
          gridTemplateRows: `repeat(${row}, 1fr)`,
        }}
      >
        {pieceIndices.map((index) => (
          <FittedPiece key={`fitted-piece-${index}`} index={index} />
        ))}
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${illust.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
    </div>
  );
};

const styles = {
  container: css({
    w: '100%',
    h: '55cqh',
    boxSizing: 'border-box',
    pos: 'absolute',
    top: '0',
    right: '0',
    left: '0',
  }),
  innerContainer: css({
    maxW: '100%',
    maxH: '100%',
    display: 'grid',
    aspectRatio: '3 / 2',
    pos: 'absolute',
    bottom: 0,
    right: 'calc(20 / 390 * 100cqw)',
    left: 'calc(20 / 390 * 100cqw)',
  }),
  background: css({
    pos: 'absolute',
    inset: 0,
    opacity: 0.4,
  }),
};
