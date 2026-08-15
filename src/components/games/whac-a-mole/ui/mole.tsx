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
        'w-[33.33%] h-[33.33%] absolute overflow-hidden',
        show && !hide ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none',
        hit && 'pointer-events-none overflow-visible z-game-foreground'
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
