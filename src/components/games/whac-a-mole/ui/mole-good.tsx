import StarImage from '~/assets/img/common/star.png';
import { cn } from '~/utils';

type MoleGoodProps = {
  show: boolean;
  hide: boolean;
  hit: boolean;
};

export const MoleGood = ({ show, hide, hit }: MoleGoodProps) => {
  return (
    <div
      className={cn(
        'h-full w-full transition-transform duration-100 ease-out',
        show && !hide ? 'translate-y-0' : 'translate-y-[101%]',
        hit && '-translate-y-[33.3%] scale-120 opacity-0 transition-all duration-400 ease-out'
      )}
    >
      <img src={StarImage.src} alt="Star" />
    </div>
  );
};
