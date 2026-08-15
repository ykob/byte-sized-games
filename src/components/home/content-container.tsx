import type { PropsWithChildren } from 'react';

export const ContentContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="[container-type:size] mx-auto max-w-[1080px] [container-name:content]">
      <div className="box-border grid gap-[clamp(1.5rem,6cqw,3rem)] px-[clamp(1rem,4cqw,2rem)] py-[clamp(1.5rem,6cqw,3rem)]">
        {children}
      </div>
    </div>
  );
};
