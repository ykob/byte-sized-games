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
    '--gutter': 'calc(token(spacing.6) / token(sizes.gameContentMax) * 100cqw)',
    top: 'var(--gutter)',
    left: 'var(--gutter)',
    right: 'var(--gutter)',
    zIndex: 'game.ui',
  }),
};
