import type { PropsWithChildren } from 'react';
import { Header } from './header';

export const GameContent = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.grid}>
          <Header />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: '@container/content [container-type:size]',
  innerContainer:
    '@min-[480px]/content:min-h-[100svh] @min-[480px]/content:grid @min-[480px]/content:place-items-center',
  grid: '@min-[480px]/content:@max-[1119px]/content:grid @min-[480px]/content:@max-[1119px]/content:grid-cols-[480px] @min-[480px]/content:@max-[1119px]/content:grid-rows-[auto_1fr] @min-[480px]/content:@max-[1119px]/content:gap-8 @min-[480px]/content:@max-[1119px]/content:py-12 @min-[1120px]/content:grid @min-[1120px]/content:grid-cols-[240px_480px] @min-[1120px]/content:gap-16 @min-[1120px]/content:py-20',
  content:
    '@container/content [container-type:size] w-full max-w-[480px] h-[100svh] relative overflow-hidden bg-bg-main @min-[480px]/content:h-auto @min-[480px]/content:max-h-[960px] @min-[480px]/content:rounded-lg @min-[480px]/content:aspect-[3/4] @min-[480px]/content:shadow-[0_2px_200px_0_#80aeae]',
};
