import { css } from 'styled-system/css';

export const Card = () => {
  return <div className={styles.container}>Card</div>;
};

const styles = {
  container: css({
    cursor: 'pointer',
    rounded: '4%',
    overflow: 'hidden',
    aspectRatio: '2.5 / 3.5',
    bgColor: '#ccc',
  }),
};
