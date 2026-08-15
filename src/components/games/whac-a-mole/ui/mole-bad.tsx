import BombImage from '~/assets/img/common/bomb.png';
import { cn } from '~/utils';
import { ExplosionEffect } from './explosion-effect';

type MoleBadProps = {
  show: boolean;
  hide: boolean;
  hit: boolean;
};

export const MoleBad = ({ show, hide, hit }: MoleBadProps) => {
  return (
    <div className="relative w-full h-full">
      <div
        className={cn(
          'w-full h-full transition-transform duration-100 ease-out',
          show && !hide ? 'translate-y-0' : 'translate-y-[101%]',
          hit && 'scale-150 brightness-200 opacity-0 transition-all duration-100 ease-out'
        )}
      >
        <img src={BombImage.src} alt="Bomb" />
      </div>
      {hit && <ExplosionEffect />}
    </div>
  );
};
