import { Card } from './card';

export const Cards = () => {
  const cards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="w-full h-full grid grid-cols-4 place-content-center gap-2 [perspective:100px] px-[calc(32/640*100cqw)] absolute inset-0">
      {cards.map((_, index) => {
        return <Card key={`card-${index}`} index={index} />;
      })}
    </div>
  );
};
