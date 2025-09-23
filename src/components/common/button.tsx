import type { ComponentProps } from 'react';
import { css, cx } from 'styled-system/css';

type ButtonProps = ComponentProps<'button'>;

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cx(styles.container, className)} {...props}>
      {children}
    </button>
  );
};

const styles = {
  container: css({
    h: '2.4em',
    px: '1.2em',
    cursor: 'pointer',
    rounded: '9999px',
    fontSize: '1.5rem',
    color: 'button.text',
    bgColor: 'button.bg',
    boxShadow: '0 3px 0 0 token(colors.button.bevel)',
  }),
};
