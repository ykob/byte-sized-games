import { css } from 'styled-system/css';

type PieceProps = {
  onClick: () => void;
};

export const Piece = ({ onClick }: PieceProps) => {
  return (
    <button onClick={onClick}>
      <div className={styles.container}></div>
    </button>
  );
};

const styles = {
  container: css({}),
};
