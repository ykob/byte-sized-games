import { useAtomValue } from 'jotai';
import { getGridAtom } from '../stores';
import { UnfittedPiece } from './unfitted-piece';

export const UnfittedPieces = () => {
  const { row, column } = useAtomValue(getGridAtom);
  const pieceIndices = Array.from({ length: row * column }, (_, i) => i);

  return (
    <div className="w-full h-[45cqh] box-border absolute bottom-0 right-0 left-0">
      <div className="w-full h-full absolute top-0">
        {pieceIndices.map((index) => {
          return <UnfittedPiece key={`unfitted-piece-${index}`} index={index} />;
        })}
      </div>
    </div>
  );
};
