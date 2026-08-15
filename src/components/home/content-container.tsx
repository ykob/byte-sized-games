import type { PropsWithChildren } from 'react';
import { cn } from '~/utils';

export const ContentContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        // Sizing & Margin
        'mx-auto max-w-[1080px]',
        // Container Query
        '[container-type:size] [container-name:content]'
      )}
    >
      <div
        className={cn(
          // Grid Layout
          'box-border grid gap-[clamp(1.5rem,6cqw,3rem)]',
          // Padding
          'px-[clamp(1rem,4cqw,2rem)] py-[clamp(1.5rem,6cqw,3rem)]'
        )}
      >
        {children}
      </div>
    </div>
  );
};
