import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const GameUIContainer = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

const styles = {
  container:
    'flex items-center justify-between absolute [--gutter:calc(24/480*100cqw)] top-[var(--gutter)] left-[var(--gutter)] right-[var(--gutter)] z-game-ui',
};
