import ExplosionImage from '~/assets/img/common/explosion.png';

export const ExplosionEffect = () => {
  return <img className={styles.container} src={ExplosionImage.src} alt="Explosion" />;
};

const styles = {
  container: 'absolute inset-0 animate-[explosionEffect_0.6s_ease-out_both]',
};
