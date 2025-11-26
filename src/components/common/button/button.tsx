import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import { cx } from 'styled-system/css';
import { styles } from './styles.ts';

type BaseButtonProps = {
  buttonType?: 'primary' | 'secondary' | 'danger';
};

type ButtonProps<C extends ElementType> = BaseButtonProps &
  PropsWithChildren<{
    as?: C;
    className?: string;
  }> &
  Omit<
    ComponentPropsWithoutRef<C>,
    keyof (BaseButtonProps & { as?: C; children?: React.ReactNode; className?: string })
  >;

export const Button = <C extends ElementType = 'button'>({
  as,
  buttonType = 'primary',
  children,
  className,
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button';

  return (
    <Component
      className={cx(
        styles.container({
          buttonType,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
