import { useAtomValue } from 'jotai';
import BasketImage from '~/assets/img/avoid-and-collect/basket.png';
import { cn } from '~/utils';
import { getCatcherPositionXAtom, type Lane } from '../stores';

const lanePositionClasses: Record<Lane, string> = {
  0: 'translate-x-[16cqw]',
  1: 'translate-x-[33cqw]',
  2: 'translate-x-[50cqw]',
  3: 'translate-x-[67cqw]',
  4: 'translate-x-[84cqw]',
};

export const Catcher = () => {
  const positionX = useAtomValue(getCatcherPositionXAtom);

  return (
    <div
      className={cn(
        // Layout & Position
        'z-game-content absolute inset-x-0 bottom-[calc(64px+3.2rem+5cqw)]',
        // Flexbox
        'flex justify-between'
      )}
    >
      <div
        className={cn(
          // Layout & Sizing
          'absolute -top-[10cqw] -left-[10cqw] h-[20cqw] w-[20cqw]',
          // Transition
          'transition-transform duration-100 ease-out',
          // Dynamic Lane Position
          lanePositionClasses[positionX]
        )}
      >
        <img src={BasketImage.src} alt="Basket" />
      </div>
    </div>
  );
};
