import { css } from 'styled-system/css';
import { FallingItem } from './falling-item';

export const FallingItems = () => {
  const fallingItemIndices = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={styles.container}>
      {fallingItemIndices.map((index) => (
        <FallingItem key={index} index={index} />
      ))}
    </div>
  );
};

const styles = {
  container: css({
    container: 'falling-items',
    containerType: 'size',
    pos: 'absolute',
    inset: '0 0 calc(64px + 3.2rem + 5cqw)',
  }),
};
