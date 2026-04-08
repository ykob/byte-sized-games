import type { PropsWithChildren } from 'react';
import { css } from 'styled-system/css';

type Props = PropsWithChildren;

export const GameUiContainer = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    pos: 'absolute',
    top: '16px',
    left: '16px',
    right: '16px',
    zIndex: 'game.ui',
  }),
};
