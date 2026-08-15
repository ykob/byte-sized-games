import LifeImage from '~/assets/img/common/life.png';
import LifeLostImage from '~/assets/img/common/life_lost.png';

type Props = {
  lost: boolean;
};

export const LifeMarker = ({ lost }: Props) => {
  return (
    <img
      className="h-auto w-[8cqw] object-contain"
      src={lost ? LifeLostImage.src : LifeImage.src}
      alt={lost ? 'Life lost' : 'Life'}
    />
  );
};
