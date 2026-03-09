import { cva } from 'styled-system/css';

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
      className={styles.container({ show, hide })}
      style={{
        top: `${(position % 3) * 33.333}%`,
        left: `${Math.floor(position / 3) * 33.333}%`,
      }}
      onClick={onClick}
    >
      <div className={styles.body({ show, hide, hit, type })}></div>
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
        },
      },
    ],
  }),
  body: cva({
    base: {
      w: '100%',
      h: '100%',
      transition: 'transform 0.1s ease-out',
    },
    variants: {
      show: {
        true: {
          transform: 'translate3d(0, 0, 0)',
        },
        false: {
          transform: 'translate3d(0, 101%, 0)',
        },
      },
      hide: {
        true: {
          transform: 'translate3d(0, 101%, 0)',
        },
      },
      hit: {
        true: {
          transform: 'translate3d(0, 101%, 0)',
        },
      },
      type: {
        good: {
          bgColor: '#0f0',
        },
        bad: {
          bgColor: '#f00',
        },
      },
    },
    compoundVariants: [
      {
        type: 'good',
        hit: true,
        css: {
          bgColor: '#00f',
        },
      },
      {
        type: 'bad',
        hit: true,
        css: {
          bgColor: '#00f',
        },
      },
    ],
  }),
};
