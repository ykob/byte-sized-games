import type { PropsWithChildren } from 'react';

export const ContentContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-[1080px] mx-auto [container-name:content] [container-type:size]">
      <div className="box-border grid gap-[clamp(1.5rem,6cqw,3rem)] px-[clamp(1rem,4cqw,2rem)] py-[clamp(1.5rem,6cqw,3rem)]">
        {children}
      </div>
    </div>
  );
};
