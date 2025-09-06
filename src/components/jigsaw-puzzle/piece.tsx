import { css } from 'styled-system/css';

type PieceProps = {
  index: number;
};

export const Piece = ({ index }: PieceProps) => {
  return <div className={styles.container}>{index}</div>;
};

const styles = {
  container: css({
    w: '100%',
    h: '100%',
    color: '#fff',
    bgColor: '#aa0000',
  }),
};
