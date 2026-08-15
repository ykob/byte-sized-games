import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import illust from '~/assets/img/jigsaw-puzzle/illust.png';
import { getGridAtom, setBoardSizeAtom } from '../stores';
import { FittedPiece } from './fitted-piece';

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
    <div className="absolute top-0 right-0 left-0 box-border h-[55cqh] w-full">
      <div
        className="absolute right-[calc(20/390*100cqw)] bottom-0 left-[calc(20/390*100cqw)] grid aspect-[3/2] max-h-full max-w-full"
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
          className="absolute inset-0 bg-cover bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url(${illust.src})`,
          }}
        ></div>
      </div>
    </div>
  );
};
