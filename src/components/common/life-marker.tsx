import { cva } from 'styled-system/css';

type Props = {
  lost: boolean;
};

export const LifeMarker = ({ lost }: Props) => {
  return <div className={styles.container({ lost })}></div>;
};

const styles = {
  container: cva({
    base: {},
    variants: {
      lost: {
        true: {},
        false: {},
      },
    },
  }),
};
