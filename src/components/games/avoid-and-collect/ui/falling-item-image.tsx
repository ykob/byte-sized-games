import BombImage from '~/assets/img/common/bomb.png';
import Fruit01Image from '~/assets/img/common/fruit01.png';
import Fruit02Image from '~/assets/img/common/fruit02.png';
import Fruit03Image from '~/assets/img/common/fruit03.png';
import Fruit04Image from '~/assets/img/common/fruit04.png';
import Fruit05Image from '~/assets/img/common/fruit05.png';
import Fruit06Image from '~/assets/img/common/fruit06.png';
import type { FallingItemType } from '../stores';

type Props = {
  type: FallingItemType;
};

const itemImageMap: Record<FallingItemType, { src: string; alt: string }> = {
  FAULT: { src: BombImage.src, alt: 'Bomb' },
  SUCCESS_1: { src: Fruit01Image.src, alt: 'Fruit' },
  SUCCESS_2: { src: Fruit02Image.src, alt: 'Fruit' },
  SUCCESS_3: { src: Fruit03Image.src, alt: 'Fruit' },
  SUCCESS_4: { src: Fruit04Image.src, alt: 'Fruit' },
  SUCCESS_5: { src: Fruit05Image.src, alt: 'Fruit' },
  SUCCESS_6: { src: Fruit06Image.src, alt: 'Fruit' },
};

export const FallingItemImage = ({ type }: Props) => {
  const image = itemImageMap[type];

  return <img src={image.src} alt={image.alt} />;
};
