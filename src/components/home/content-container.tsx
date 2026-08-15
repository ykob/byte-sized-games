import type { PropsWithChildren } from 'react';

export const ContentContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

const styles = {
  outer: 'max-w-[1080px] mx-auto [container-name:content] [container-type:size]',
  inner:
    'box-border grid gap-[clamp(1.5rem,6cqw,3rem)] px-[clamp(1rem,4cqw,2rem)] py-[clamp(1.5rem,6cqw,3rem)]',
};
