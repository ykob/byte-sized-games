import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { css } from 'styled-system/css';
import { FittedPiece } from './fitted-piece';
import { getPiecesAtom, puzzleBoardAtom } from './store';

export const PuzzleBoard = () => {
  const puzzleBoardRef = useRef(null);
  const pieces = useAtomValue(getPiecesAtom);
  const setPuzzleBoard = useSetAtom(puzzleBoardAtom);

  useEffect(() => {
    if (puzzleBoardRef.current) {
      setPuzzleBoard(puzzleBoardRef.current);
    }
  }, [puzzleBoardRef.current]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer} ref={puzzleBoardRef}>
        {pieces.map((piece) => (
          <FittedPiece
            key={`fitted-piece-${piece.index}`}
            fitted={piece.fitted}
            index={piece.index}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: css({
    w: '100%',
    h: '56cqh',
    boxSizing: 'border-box',
    pos: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    mx: 'auto',
    pt: 'calc(32 / 390 * 100cqw)',
    px: 'calc(20 / 390 * 100cqw)',
  }),
  innerContainer: css({
    maxW: '100%',
    maxH: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    aspectRatio: '5 / 4',
    mx: 'auto',
    bgColor: '#ccc',
  }),
};
