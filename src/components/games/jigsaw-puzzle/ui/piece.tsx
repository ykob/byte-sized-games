import { useAtomValue } from 'jotai';
import { memo } from 'react';
import illust from '~/assets/img/jigsaw-puzzle/illust.png';
import { getGridAtom } from '../stores';

type PieceProps = {
  index: number;
};

const PieceComponent = ({ index }: PieceProps) => {
  const { row, column } = useAtomValue(getGridAtom);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${illust.src})`,
        backgroundSize: `${column * 100}% ${row * 100}%`,
        backgroundPositionX: `${((index % column) / (column - 1)) * 100}%`,
        backgroundPositionY: `${(Math.floor(index / column) / (row - 1)) * 100}%`,
      }}
    ></div>
  );
};

export const Piece = memo(PieceComponent);

const styles = {
  container: 'w-full h-full bg-no-repeat',
};
