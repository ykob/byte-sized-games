import type { ComponentProps } from 'react';
import { cva, cx } from 'styled-system/css';

type ButtonProps = ComponentProps<'button'> & {
  buttonType: 'primary' | 'secondary' | 'danger';
};

export const Button = ({ buttonType = 'primary', children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cx(
        styles.container({
          buttonType,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const styles = {
  container: cva({
    base: {
      h: '2.4em',
      px: '1.2em',
      cursor: 'pointer',
      rounded: '9999px',
      fontSize: '1.5rem',
    },
    variants: {
      buttonType: {
        primary: {
          color: 'button.primary.text',
          bgColor: 'button.primary.bg',
          boxShadow: '0 3px 0 0 token(colors.button.primary.bevel)',
        },
        secondary: {
          color: 'button.secondary.text',
          bgColor: 'button.secondary.bg',
          boxShadow: '0 3px 0 0 token(colors.button.secondary.bevel)',
        },
        danger: {
          color: 'button.danger.text',
          bgColor: 'button.danger.bg',
          boxShadow: '0 3px 0 0 token(colors.button.danger.bevel)',
        },
      },
    },
  }),
};
