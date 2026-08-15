import ExplosionImage from '~/assets/img/common/explosion.png';

export const ExplosionEffect = () => {
  return (
    <img
      className="absolute inset-0 animate-[explosionEffect_0.6s_ease-out_both]"
      src={ExplosionImage.src}
      alt="Explosion"
    />
  );
};
