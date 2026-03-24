import { cva } from 'styled-system/css';
import StarImage from '~/assets/img/common/star.png';

type MoleGoodProps = {
  show: boolean;
  hide: boolean;
  hit: boolean;
};

export const MoleGood = ({ show, hide, hit }: MoleGoodProps) => {
  return (
    <div className={styles.body({ show, hide, hit })}>
      <img src={StarImage.src} alt="" />
    </div>
  );
};

const styles = {
  body: cva({
    base: {
      w: '100%',
      h: '100%',
      transition: 'transform 0.1s ease-out',
    },
    variants: {
      show: {
        true: {
          transform: 'translate3d(0, 0, 0)',
        },
        false: {
          transform: 'translate3d(0, 101%, 0)',
        },
      },
      hide: {
        true: {
          transform: 'translate3d(0, 101%, 0)',
        },
      },
      hit: {
        true: {
          transform: 'translate3d(0, 101%, 0) scale(1.2)',
          opacity: 0,
        },
      },
    },
  }),
};
