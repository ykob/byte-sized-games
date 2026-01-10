import { css } from 'styled-system/css';
import type { PropsWithChildren } from 'react';

export const ContentContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

const styles = {
  outer: css({
    maxW: '1080px',
    mx: 'auto',
    container: 'content',
    containerType: 'size',
  }),
  inner: css({
    boxSizing: 'border-box',
    display: 'grid',
    gap: 'clamp(24px, 6cqw, 64px)',
    px: 'clamp(16px, 4cqw, 48px)',
    py: 'clamp(24px, 6cqw, 64px)',
  }),
};
