import type { PropsWithChildren } from 'react';
import { cn } from '~/utils';

type Props = PropsWithChildren;

export const GameUIContainer = ({ children }: Props) => {
  return (
    <div
      className={cn(
        // Layout & Positioning
        'z-game-ui absolute top-[var(--gutter)] right-[var(--gutter)] left-[var(--gutter)] [--gutter:calc(24/480*100cqw)]',
        // Alignment
        'flex items-center justify-between'
      )}
    >
      {children}
    </div>
  );
};
