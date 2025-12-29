import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { getGridAtom } from './stores';
import { UnfittedPiece } from './unfitted-piece';

export const UnfittedPieces = () => {
  const { row, column } = useAtomValue(getGridAtom);
  const pieceIndices = Array.from({ length: row * column }, (_, i) => i);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {pieceIndices.map((index) => {
          return <UnfittedPiece key={`unfitted-piece-${index}`} index={index} />;
        })}
      </div>
    </div>
  );
};

const styles = {
  container: css({
    w: '100%',
    h: '45cqh',
    boxSizing: 'border-box',
    pos: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
  }),
  innerContainer: css({
    w: '100%',
    h: '100%',
    pos: 'absolute',
    top: 0,
  }),
};
