import { cva } from 'styled-system/css';

type MoleProps = {
  show: boolean;
  hide: boolean;
  position: number;
};

export const Mole = ({ show, hide, position }: MoleProps) => {
  return (
    <div
      className={styles.container({ show, hide })}
      style={{
        top: `${(position % 3) * 33.333}%`,
        left: `${Math.floor(position / 3) * 33.333}%`,
      }}
    >
      <div className={styles.body({ show, hide })}></div>
    </div>
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
    ],
  }),
  body: cva({
    base: {
      w: '100%',
      h: '100%',
      bgColor: '#f00',
      transition: 'transform 0.1s ease-out',
    },
    compoundVariants: [
      {
        show: false,
        hide: false,
        css: {
          transform: 'translate3d(0, 100%, 0)',
        },
      },
      {
        show: true,
        hide: false,
        css: {
          transform: 'translate3d(0, 0, 0)',
        },
      },
      {
        show: true,
        hide: true,
        css: {
          transform: 'translate3d(0, 100%, 0)',
        },
      },
    ],
  }),
};
