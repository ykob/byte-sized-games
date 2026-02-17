import { css, cva } from 'styled-system/css';
import LifeImage from '~/assets/img/common/life.png';
import LifeLostImage from '~/assets/img/common/life_lost.png';

type Props = {
  lost: boolean;
};

export const LifeMarker = ({ lost }: Props) => {
  return (
    <div className={styles.container}>
      <img className={styles.markLive({ lost })} src={LifeImage.src} alt="" />
      <img className={styles.markLost({ lost })} src={LifeLostImage.src} alt="" />
    </div>
  );
};

const styles = {
  container: css({
    width: '10cqw',
  }),
  markLive: cva({
    base: {},
    variants: {
      lost: {
        true: {
          display: 'none',
        },
        false: {
          display: 'block',
        },
      },
    },
  }),
  markLost: cva({
    base: {},
    variants: {
      lost: {
        true: {
          display: 'block',
        },
        false: {
          display: 'none',
        },
      },
    },
  }),
};
