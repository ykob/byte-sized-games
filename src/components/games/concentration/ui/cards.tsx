import { cn } from '~/utils';
import { Card } from './card';

export const Cards = () => {
  const cards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div
      className={cn(
        // Layout & Position
        'absolute inset-0 h-full w-full px-[calc(32/640*100cqw)]',
        // Grid & Alignment
        'grid grid-cols-4 place-content-center gap-2',
        // Perspective
        '[perspective:100px]'
      )}
    >
      {cards.map((_, index) => {
        return <Card key={`card-${index}`} index={index} />;
      })}
    </div>
  );
};
