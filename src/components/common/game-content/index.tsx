import type { PropsWithChildren } from 'react';
import { css } from 'styled-system/css';
import logo from '~/assets/img/logo.png';
import { Button } from '~/components/common';

export const GameContent = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div>
          <div className={styles.logo}>
            <img src={logo.src} alt="Byte Sized Games" />
          </div>
          <div>
            <Button as="a" href="/">
              HOME
            </Button>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  container: css({
    container: 'content',
    containerType: 'size',
    minH: '100svh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  logo: css({
    '@container (width < 1120px) and (width >= 640px)': {
      width: '200px',
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
