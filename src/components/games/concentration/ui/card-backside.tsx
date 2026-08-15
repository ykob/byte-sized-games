import { cva } from 'class-variance-authority';
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
  back: cva(
    'absolute inset-0 rounded-[4%] overflow-hidden shadow-[0_0_3px_rgba(0,0,0,0.4)] text-white [backface-visibility:hidden] transition-transform duration-200',
    {
      variants: {
        flipped: {
          true: '[transform:rotate3d(0,1,0,180deg)]',
          false: '[transform:rotate3d(0,1,0,0deg)]',
        },
      },
    }
  ),
};
