import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { ScoreCounter } from '~/components/common';
import { getScoreAtom } from '../stores';

export const ScoreView = () => {
  const score = useAtomValue(getScoreAtom);

  return (
    <div className={styles.container}>
      <ScoreCounter score={score} />
    </div>
  );
};

const styles = {
  container: css({
    pos: 'absolute',
    top: '16px',
    left: '16px',
    zIndex: '10',
  }),
};
