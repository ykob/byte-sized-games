import type { PropsWithChildren } from 'react';
import { css } from 'styled-system/css';

type Props = PropsWithChildren;

export const GameUIContainer = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    pos: 'absolute',
    top: 'calc(24px / {sizes.gameContentMax} * 100cqw)',
    left: 'calc(24px / {sizes.gameContentMax} * 100cqw)',
    right: 'calc(24px / {sizes.gameContentMax} * 100cqw)',
    zIndex: 'game.ui',
  }),
};
