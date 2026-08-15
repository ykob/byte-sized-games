import { cva } from 'class-variance-authority';
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
      className={styles.container({ show, hide, hit })}
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

const styles = {
  container: cva('w-[33.33%] h-[33.33%] absolute overflow-hidden', {
    variants: {
      show: { true: '', false: '' },
      hide: { true: '', false: '' },
      hit: { true: 'pointer-events-none overflow-visible z-game-foreground', false: '' },
    },
    compoundVariants: [
      { show: false, hide: false, className: 'pointer-events-none' },
      { show: true, hide: false, className: 'cursor-pointer pointer-events-auto' },
      { show: true, hide: true, className: 'pointer-events-none' },
    ],
  }),
};
