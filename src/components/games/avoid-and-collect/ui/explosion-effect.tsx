import { css } from 'styled-system/css';
import ExplosionImage from '~/assets/img/common/explosion.png';

export const ExplosionEffect = () => {
  return <img className={styles.container} src={ExplosionImage.src} alt="Explosion" />;
};

const styles = {
  container: css({
    pos: 'absolute',
    inset: '0',
    animationName: 'explosionEffect',
    animationFillMode: 'both',
    animationDuration: '0.6s',
    animationTimingFunction: 'ease-out-circ',
    animationIterationCount: 1,
  }),
};
