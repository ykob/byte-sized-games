import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { css } from 'styled-system/css';
import { FittedPiece } from './fitted-piece';
import { getPiecesAtom, puzzleBoardAtom, unhoverPieceAtom } from './store';

export const PuzzleBoard = () => {
  const puzzleBoardRef = useRef(null);
  const pieces = useAtomValue(getPiecesAtom);
  const setPuzzleBoard = useSetAtom(puzzleBoardAtom);
  const unhoverPiece = useSetAtom(unhoverPieceAtom);

  useEffect(() => {
    if (puzzleBoardRef.current) {
      setPuzzleBoard(puzzleBoardRef.current);
    }
  }, [puzzleBoardRef.current]);

  return (
    <div className={styles.container}>
      <div
        className={styles.innerContainer}
        ref={puzzleBoardRef}
        onMouseLeave={unhoverPiece}
        onTouchEnd={unhoverPiece}
      >
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
    h: '60cqh',
    pos: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    mx: 'auto',
  }),
  innerContainer: css({
    maxW: '100%',
    maxH: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    aspectRatio: '3 / 4',
    mx: 'auto',
  }),
};
