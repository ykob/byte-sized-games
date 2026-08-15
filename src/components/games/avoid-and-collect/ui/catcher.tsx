import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import BasketImage from '~/assets/img/avoid-and-collect/basket.png';
import { getCatcherPositionXAtom, type Lane } from '../stores';

export const Catcher = () => {
  const positionX = useAtomValue(getCatcherPositionXAtom);

  return (
    <div className={styles.container}>
      <div className={styles.marker({ positionX })}>
        <img src={BasketImage.src} alt="Basket" />
      </div>
    </div>
  );
};

const styles = {
  container: 'flex justify-between absolute inset-x-0 bottom-[calc(64px+3.2rem+5cqw)]',
  marker: cva('w-[20cqw] h-[20cqw] absolute -top-[10cqw] -left-[10cqw] transition-transform duration-100 ease-out', {
    variants: {
      positionX: {
        0: 'translate-x-[16cqw]',
        1: 'translate-x-[33cqw]',
        2: 'translate-x-[50cqw]',
        3: 'translate-x-[67cqw]',
        4: 'translate-x-[84cqw]',
      } satisfies Record<Lane, string>,
    },
  }),
};
