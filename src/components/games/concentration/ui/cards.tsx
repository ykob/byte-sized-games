import { Card } from './card';

export const Cards = () => {
  const cards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="absolute inset-0 grid h-full w-full grid-cols-4 place-content-center gap-2 px-[calc(32/640*100cqw)] [perspective:100px]">
      {cards.map((_, index) => {
        return <Card key={`card-${index}`} index={index} />;
      })}
    </div>
  );
};
