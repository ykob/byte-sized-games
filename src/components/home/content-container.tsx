import type { PropsWithChildren } from 'react';
import { css } from 'styled-system/css';

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
    gap: 'clamp(token(spacing.6), 6cqw, token(spacing.12))',
    px: 'clamp(token(spacing.4), 4cqw, token(spacing.8))',
    py: 'clamp(token(spacing.6), 6cqw, token(spacing.12))',
  }),
};
