import { useAtomValue, useSetAtom } from 'jotai';
import { css } from 'styled-system/css';
import illust from '~/assets/img/jigsaw-puzzle/illust.png';
import { FittedPiece } from './fitted-piece';
import { getGridAtom, getPiecesAtom, puzzleBoardAtom } from './stores';

export const PuzzleBoard = () => {
  const { row, column } = useAtomValue(getGridAtom);
  const pieces = useAtomValue(getPiecesAtom);
  const setPuzzleBoardElement = useSetAtom(puzzleBoardAtom);

  return (
    <div className={styles.container}>
      <div
        className={styles.innerContainer}
        ref={setPuzzleBoardElement}
        style={{
          gridTemplateColumns: `repeat(${column}, 1fr)`,
          gridTemplateRows: `repeat(${row}, 1fr)`,
        }}
      >
        {pieces.map((piece) => (
          <FittedPiece
            key={`fitted-piece-${piece.index}`}
            fitted={piece.fitted}
            index={piece.index}
          />
        ))}
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${illust.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
    </div>
  );
};

const styles = {
  container: css({
    w: '100%',
    h: '55cqh',
    boxSizing: 'border-box',
    pos: 'absolute',
    top: '0',
    right: '0',
    left: '0',
  }),
  innerContainer: css({
    maxW: '100%',
    maxH: '100%',
    display: 'grid',
    aspectRatio: '3 / 2',
    pos: 'absolute',
    bottom: 0,
    right: 'calc(20 / 390 * 100cqw)',
    left: 'calc(20 / 390 * 100cqw)',
  }),
  background: css({
    pos: 'absolute',
    inset: 0,
    opacity: 0.4,
  }),
};
