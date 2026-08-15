import type { PropsWithChildren } from 'react';
import { cn } from '~/utils';
import { Header } from './header';

export const GameContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="@container/content [container-type:size]">
      <div className="@min-[480px]/content:grid @min-[480px]/content:min-h-[100svh] @min-[480px]/content:place-items-center">
        <div
          className={cn(
            // Responsive Medium Screen Grid Layout
            '@min-[480px]/content:@max-[1119px]/content:grid @min-[480px]/content:@max-[1119px]/content:grid-cols-[480px] @min-[480px]/content:@max-[1119px]/content:grid-rows-[auto_1fr] @min-[480px]/content:@max-[1119px]/content:gap-8 @min-[480px]/content:@max-[1119px]/content:py-12',
            // Responsive Large Screen Grid Layout
            '@min-[1120px]/content:grid @min-[1120px]/content:grid-cols-[240px_480px] @min-[1120px]/content:gap-16 @min-[1120px]/content:py-20'
          )}
        >
          <Header />
          <div
            className={cn(
              // Layout & Sizing
              'relative h-[100svh] w-full max-w-[480px] overflow-hidden',
              // Background
              'bg-bg-main',
              // Container Query
              '@container/content [container-type:size]',
              // Responsive Frame Styles
              '@min-[480px]/content:aspect-[3/4] @min-[480px]/content:h-auto @min-[480px]/content:max-h-[960px] @min-[480px]/content:rounded-lg @min-[480px]/content:shadow-[0_2px_200px_0_#80aeae]'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
