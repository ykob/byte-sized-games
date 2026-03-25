import { cva } from 'styled-system/css';
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
  container: cva({
    base: {
      width: '33.33%',
      height: '33.33%',
      pos: 'absolute',
      overflow: 'hidden',
    },
    compoundVariants: [
      {
        show: false,
        hide: false,
        css: {
          pointerEvents: 'none',
        },
      },
      {
        show: true,
        hide: false,
        css: {
          cursor: 'pointer',
          pointerEvents: 'auto',
        },
      },
      {
        show: true,
        hide: true,
        css: {
          pointerEvents: 'none',
        },
      },
      {
        hit: true,
        css: {
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 'game.ui',
        },
      },
    ],
  }),
};
