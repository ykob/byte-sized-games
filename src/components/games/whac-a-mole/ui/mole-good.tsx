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
        // Sizing & Transition
        'h-full w-full transition-transform duration-100 ease-out',
        // Show / Hide Transform
        show && !hide ? 'translate-y-0' : 'translate-y-[101%]',
        // Hit Transform & Opacity Animation
        hit && '-translate-y-[33.3%] scale-120 opacity-0 transition-all duration-400 ease-out'
      )}
    >
      <img src={StarImage.src} alt="Star" />
    </div>
  );
};
