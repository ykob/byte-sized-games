import { useAtomValue } from 'jotai';
import { getGridAtom } from '../stores';
import { UnfittedPiece } from './unfitted-piece';

export const UnfittedPieces = () => {
  const { row, column } = useAtomValue(getGridAtom);
  const pieceIndices = Array.from({ length: row * column }, (_, i) => i);

  return (
    <div className="absolute right-0 bottom-0 left-0 box-border h-[45cqh] w-full">
      <div className="absolute top-0 h-full w-full">
        {pieceIndices.map((index) => {
          return <UnfittedPiece key={`unfitted-piece-${index}`} index={index} />;
        })}
      </div>
    </div>
  );
};
