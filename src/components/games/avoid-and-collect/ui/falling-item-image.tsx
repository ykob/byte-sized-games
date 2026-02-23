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

export const FallingItemImage = ({ type }: Props) => {
  return (
    <>
      {type === 'FAULT' && <img src={BombImage.src} alt="" />}
      {type === 'SUCCESS_1' && <img src={Fruit01Image.src} alt="" />}
      {type === 'SUCCESS_2' && <img src={Fruit02Image.src} alt="" />}
      {type === 'SUCCESS_3' && <img src={Fruit03Image.src} alt="" />}
      {type === 'SUCCESS_4' && <img src={Fruit04Image.src} alt="" />}
      {type === 'SUCCESS_5' && <img src={Fruit05Image.src} alt="" />}
      {type === 'SUCCESS_6' && <img src={Fruit06Image.src} alt="" />}
    </>
  );
};
