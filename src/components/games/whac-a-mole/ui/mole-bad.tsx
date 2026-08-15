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
    <div className="relative h-full w-full">
      <div
        className={cn(
          'h-full w-full transition-transform duration-100 ease-out',
          show && !hide ? 'translate-y-0' : 'translate-y-[101%]',
          hit && 'scale-150 opacity-0 brightness-200 transition-all duration-100 ease-out'
        )}
      >
        <img src={BombImage.src} alt="Bomb" />
      </div>
      {hit && <ExplosionEffect />}
    </div>
  );
};
