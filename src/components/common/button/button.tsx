import type { ComponentProps } from 'react';
import { cx } from 'styled-system/css';
import { styles } from './styles.ts';

type ButtonProps = ComponentProps<'button'> & {
  buttonType?: 'primary' | 'secondary' | 'danger';
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
