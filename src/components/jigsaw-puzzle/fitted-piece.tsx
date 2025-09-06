import { Piece } from './piece';

type FittedPieceProps = {
  index: number;
};

export const FittedPiece = ({ index }: FittedPieceProps) => {
  return (
    <div>
      <Piece index={index} />
    </div>
  );
};
