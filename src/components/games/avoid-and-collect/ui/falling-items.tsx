import { FALLING_ITEM_COUNT } from '../stores';
import { FallingItem } from './falling-item';

export const FallingItems = () => {
  const fallingItemIndices = Array.from({ length: FALLING_ITEM_COUNT }, (_, i) => i);

  return (
    <div className={styles.container}>
      {fallingItemIndices.map((index) => (
        <FallingItem key={index} index={index} />
      ))}
    </div>
  );
};

const styles = {
  container:
    '@container/falling-items [container-type:size] absolute inset-x-0 top-0 bottom-[calc(64px+3.2rem+5cqw)] z-game-foreground',
};
