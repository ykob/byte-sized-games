import { useState } from 'react';
import { shuffleArray } from '~/utils';
import { Pieces, type Piece } from './pieces';

const basePieces: Piece[] = Array.from({ length: 9 }, (_, i) => {
  return {
    id: Math.random(),
    x: i % 3,
    y: Math.floor(i / 3),
    fitted: false,
  };
});

export const Content = () => {
  const [pieces, setPieces] = useState(shuffleArray(basePieces));

  return (
    <div>
      <Pieces pieces={pieces} onClickPiece={() => {}} />
    </div>
  );
};
