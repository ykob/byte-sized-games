import { css } from 'styled-system/css';
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
    <div className={styles.container}>
      {pages.map((page) => (
        <GameCard key={page.url} href={page.url} title={page.title} />
      ))}
    </div>
  );
};

const styles = {
  container: css({
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr 1fr',
  }),
};
