import { css } from 'styled-system/css';
import { MoveLeftButton } from './move-left-button';
import { MoveRightButton } from './move-right-button';

export const MoveButtons = () => {
  return (
    <div className={styles.container}>
      <MoveLeftButton />
      <MoveRightButton />
    </div>
  );
};

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    pos: 'absolute',
    inset: 'auto 16px 16px',
  }),
};
