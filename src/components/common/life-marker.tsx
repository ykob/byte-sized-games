import LifeImage from '~/assets/img/common/life.png';
import LifeLostImage from '~/assets/img/common/life_lost.png';

type Props = {
  lost: boolean;
};

export const LifeMarker = ({ lost }: Props) => {
  return (
    <img
      className={styles.container}
      src={lost ? LifeLostImage.src : LifeImage.src}
      alt={lost ? 'Life lost' : 'Life'}
    />
  );
};

const styles = {
  container: 'w-[8cqw] h-auto object-contain',
};
