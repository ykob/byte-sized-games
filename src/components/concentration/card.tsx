import { css } from 'styled-system/css';
import { cva } from 'styled-system/css/cva.mjs';
import Card01Image from '~/assets/img/concentration/card01.png';
import Card02Image from '~/assets/img/concentration/card02.png';
import Card03Image from '~/assets/img/concentration/card03.png';
import Card04Image from '~/assets/img/concentration/card04.png';
import Card05Image from '~/assets/img/concentration/card05.png';
import Card06Image from '~/assets/img/concentration/card06.png';
import CardBackImage from '~/assets/img/concentration/card_back.png';

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
          {number === 0 && <img src={Card01Image.src} alt="" />}
          {number === 1 && <img src={Card02Image.src} alt="" />}
          {number === 2 && <img src={Card03Image.src} alt="" />}
          {number === 3 && <img src={Card04Image.src} alt="" />}
          {number === 4 && <img src={Card05Image.src} alt="" />}
          {number === 5 && <img src={Card06Image.src} alt="" />}
        </div>
        <div
          className={styles.back({
            flipped,
          })}
        >
          <img src={CardBackImage.src} alt="" />
        </div>
      </div>
    </button>
  );
};

const styles = {
  container: css({
    cursor: 'pointer',
    position: 'relative',
    aspectRatio: '480 / 746',
    perspective: '1000px',
  }),
  front: cva({
    base: {
      position: 'absolute',
      inset: '0',
      rounded: '4%',
      overflow: 'hidden',
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
      overflow: 'hidden',
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
