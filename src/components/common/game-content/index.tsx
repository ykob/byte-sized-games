import type { PropsWithChildren } from 'react';
import { css } from 'styled-system/css';
import { Header } from './header';

export const GameContent = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.grid}>
          <Header />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: css({
    container: 'content',
    containerType: 'size',
  }),
  innerContainer: css({
    '@container (width >= 640px)': {
      minH: '100svh',
      display: 'grid',
      placeItems: 'center',
    },
  }),
  grid: css({
    '@container (width < 1120px) and (width >= 640px)': {
      display: 'grid',
      gridTemplateColumns: '640px',
      gridTemplateRows: 'auto 1fr',
      gap: '32px',
      py: '48px',
    },
    '@container (width >= 1120px)': {
      display: 'grid',
      gridTemplateColumns: '240px 640px',
      gap: '64px',
      py: '80px',
    },
  }),
  content: css({
    container: 'content',
    containerType: 'size',
    w: '100%',
    maxW: '640px',
    h: '100svh',
    pos: 'relative',
    overflow: 'hidden',
    bgColor: 'bg',
    '@container (width >= 640px)': {
      h: 'auto',
      maxH: '960px',
      rounded: '8px',
      aspectRatio: '3 / 4',
      boxShadow: '0 2px 200px 0 #80aeae',
    },
  }),
};
