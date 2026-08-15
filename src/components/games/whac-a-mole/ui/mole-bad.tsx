import { cva } from 'class-variance-authority';
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
        <img src={BombImage.src} alt="Bomb" />
      </div>
      {hit && <ExplosionEffect />}
    </div>
  );
};

const styles = {
  container: 'relative w-full h-full',
  body: cva('w-full h-full transition-transform duration-100 ease-out', {
    variants: {
      show: {
        true: 'translate-y-0',
        false: 'translate-y-[101%]',
      },
      hide: {
        true: 'translate-y-[101%]',
        false: '',
      },
      hit: {
        true: 'scale-150 brightness-200 opacity-0 transition-all duration-100 ease-out',
        false: '',
      },
    },
  }),
};
