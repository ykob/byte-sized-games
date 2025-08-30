import { css } from 'styled-system/css';
import { cva } from 'styled-system/css/cva.mjs';

type CardProps = {
  number: number;
  flipped: boolean;
  onClick: () => void;
};

export const Card = ({ number, flipped, onClick }: CardProps) => {
  return (
    <button onClick={onClick}>
      <div className={styles.container}>
        <div
          className={styles.front({
            flipped,
          })}
        >
          {number}
        </div>
        <div
          className={styles.back({
            flipped,
          })}
        >
          {number}
        </div>
      </div>
    </button>
  );
};

const styles = {
  container: css({
    cursor: 'pointer',
    position: 'relative',
    aspectRatio: '2.5 / 3.5',
    perspective: '1000px',
  }),
  front: cva({
    base: {
      position: 'absolute',
      inset: '0',
      rounded: '4%',
      bgColor: '#ccc',
      backfaceVisibility: 'hidden',
      transform: 'rotate3d(0, 1, 0, 180deg)',
      transition: 'transform 0.2s',
    },
    variants: {
      flipped: {
        true: {
          transform: 'rotate3d(0, 1, 0, 0deg)',
        },
        false: {
          transform: 'rotate3d(0, 1, 0, 180deg)',
        },
      },
    },
  }),
  back: cva({
    base: {
      position: 'absolute',
      inset: '0',
      rounded: '4%',
      color: '#fff',
      bgColor: '#000',
      backfaceVisibility: 'hidden',
      transform: 'rotate3d(0, 1, 0, 0deg)',
      transition: 'transform 0.2s',
    },
    variants: {
      flipped: {
        true: {
          transform: 'rotate3d(0, 1, 0, 180deg)',
        },
        false: {
          transform: 'rotate3d(0, 1, 0, 0deg)',
        },
      },
    },
  }),
};
