import CardBackImage from '~/assets/img/concentration/card_back.png';
import { cn } from '~/utils';

type Props = {
  flipped: boolean;
};

export const CardBackside = ({ flipped }: Props) => {
  return (
    <div
      className={cn(
        'absolute inset-0 rounded-[4%] overflow-hidden shadow-[0_0_3px_rgba(0,0,0,0.4)] text-white [backface-visibility:hidden] transition-transform duration-200',
        flipped ? '[transform:rotate3d(0,1,0,180deg)]' : '[transform:rotate3d(0,1,0,0deg)]'
      )}
    >
      <img src={CardBackImage.src} alt="" />
    </div>
  );
};
