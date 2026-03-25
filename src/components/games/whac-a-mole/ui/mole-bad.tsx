import { css, cva } from 'styled-system/css';
import BombImage from '~/assets/img/common/bomb.png';
import { ExplosionEffect } from './explosion-effect';

type MoleBadProps = {
  show: boolean;
  hide: boolean;
  hit: boolean;
};

export const MoleBad = ({ show, hide, hit }: MoleBadProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.body({ show, hide, hit })}>
        <img src={BombImage.src} alt="" />
      </div>
      {hit && <ExplosionEffect />}
    </div>
  );
};

const styles = {
  container: css({
    pos: 'relative',
    w: '100%',
    h: '100%',
  }),
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
          transform: 'scale(1.5)',
          filter: 'brightness(2)',
          opacity: 0,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        },
      },
    },
  }),
};
