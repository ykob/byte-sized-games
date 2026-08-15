import { cva } from 'class-variance-authority';
import StarImage from '~/assets/img/common/star.png';

type MoleGoodProps = {
  show: boolean;
  hide: boolean;
  hit: boolean;
};

export const MoleGood = ({ show, hide, hit }: MoleGoodProps) => {
  return (
    <div className={styles.body({ show, hide, hit })}>
      <img src={StarImage.src} alt="Star" />
    </div>
  );
};

const styles = {
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
        true: '-translate-y-[33.3%] scale-120 opacity-0 transition-all duration-400 ease-out',
        false: '',
      },
    },
  }),
};
