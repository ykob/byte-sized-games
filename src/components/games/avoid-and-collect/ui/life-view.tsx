import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { LifeCounter } from '~/components/common';
import { getLifeAtom } from '../stores';

export const LifeView = () => {
  const life = useAtomValue(getLifeAtom);

  return (
    <div className={styles.container}>
      <LifeCounter current={life} max={3} />
    </div>
  );
};

const styles = {
  container: css({
    pos: 'absolute',
    top: '16px',
    left: '16px',
  }),
};
