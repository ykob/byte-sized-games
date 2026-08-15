import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const GameUIContainer = ({ children }: Props) => {
  return (
    <div className="z-game-ui absolute top-[var(--gutter)] right-[var(--gutter)] left-[var(--gutter)] flex items-center justify-between [--gutter:calc(24/480*100cqw)]">
      {children}
    </div>
  );
};
