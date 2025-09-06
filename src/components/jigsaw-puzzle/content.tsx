import { useState } from 'react';
import { shuffleArray } from '~/utils';
import { PuzzleBoard } from './puzzle-board';
import type { Piece } from './type';
import { UnfittedPieces } from './unfitted-pieces';

const basePieces: Piece[] = Array.from({ length: 9 }, (_, i) => {
  return {
    index: i,
    id: Math.random(),
    x: Math.random(),
    y: Math.random(),
    fitted: false,
  };
});

export const Content = () => {
  const [pieces] = useState(shuffleArray(basePieces));

  return (
    <div>
      <PuzzleBoard pieces={pieces} />
      <UnfittedPieces pieces={pieces} onClickPiece={() => {}} />
    </div>
  );
};
