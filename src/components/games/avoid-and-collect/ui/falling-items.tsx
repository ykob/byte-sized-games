import { cn } from '~/utils';
import { FALLING_ITEM_COUNT } from '../stores';
import { FallingItem } from './falling-item';

export const FallingItems = () => {
  const fallingItemIndices = Array.from({ length: FALLING_ITEM_COUNT }, (_, i) => i);

  return (
    <div
      className={cn(
        // Layout & Position
        'z-game-foreground absolute inset-x-0 top-0 bottom-[calc(64px+3.2rem+5cqw)]',
        // Container Query
        '@container/falling-items [container-type:size]'
      )}
    >
      {fallingItemIndices.map((index) => (
        <FallingItem key={index} index={index} />
      ))}
    </div>
  );
};
