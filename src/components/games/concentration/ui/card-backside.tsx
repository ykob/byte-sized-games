import { cva } from 'styled-system/css';
import CardBackImage from '~/assets/img/concentration/card_back.png';

type Props = {
  flipped: boolean;
};

export const CardBackside = ({ flipped }: Props) => {
  return (
    <div
      className={styles.back({
        flipped,
      })}
    >
      <img src={CardBackImage.src} alt="" />
    </div>
  );
};

const styles = {
  back: cva({
    base: {
      position: 'absolute',
      inset: '0',
      rounded: '4%',
      overflow: 'hidden',
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.4)',
      color: '#fff',
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
