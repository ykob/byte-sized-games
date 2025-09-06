import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { css } from 'styled-system/css';
import { FittedPiece } from './fitted-piece';
import { puzzleBoardAtom } from './store';
import type { Piece as PieceType } from './type';

type PiecesProps = {
  pieces: PieceType[];
};

export const PuzzleBoard = ({ pieces }: PiecesProps) => {
  const puzzleBoardRef = useRef(null);
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
          <FittedPiece key={piece.id} index={piece.index} />
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
