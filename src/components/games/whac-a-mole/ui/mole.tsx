import { cn } from '~/utils';
import { MoleBad } from './mole-bad';
import { MoleGood } from './mole-good';

type MoleProps = {
  hide: boolean;
  hit: boolean;
  position: number;
  show: boolean;
  type: 'good' | 'bad';
  onClick: () => void;
};

export const Mole = ({ hide, hit, position, show, type, onClick }: MoleProps) => {
  return (
    <button
      className={cn(
        // Layout & Sizing
        'absolute h-[33.33%] w-[33.33%] overflow-hidden',
        // Interactive State
        show && !hide ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none',
        // Hit State & Layering
        hit && 'z-game-foreground pointer-events-none overflow-visible'
      )}
      style={{
        top: `${(position % 3) * 33.333}%`,
        left: `${Math.floor(position / 3) * 33.333}%`,
      }}
      onClick={onClick}
    >
      {type === 'good' ? (
        <MoleGood show={show} hide={hide} hit={hit} />
      ) : (
        <MoleBad show={show} hide={hide} hit={hit} />
      )}
    </button>
  );
};
