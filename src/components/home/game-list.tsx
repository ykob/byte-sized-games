import { GameCard } from './game-card';

interface Page {
  url: string;
  title: string;
}

interface Props {
  pages: Page[];
}

export const GameList = ({ pages }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {pages.map((page) => (
        <GameCard key={page.url} href={page.url} title={page.title} />
      ))}
    </div>
  );
};
