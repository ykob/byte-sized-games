import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import { cx } from 'styled-system/css';
import { Icon } from '../icon.tsx';
import { styles } from './styles.ts';

type BaseIconButtonProps = {
  buttonType?: 'primary' | 'secondary' | 'danger';
  circle?: boolean;
  iconPath: string;
};

type IconButtonProps<C extends ElementType> = BaseIconButtonProps &
  PropsWithChildren<{
    as?: C;
    className?: string;
  }> &
  Omit<
    ComponentPropsWithoutRef<C>,
    keyof (BaseIconButtonProps & { as?: C; children?: React.ReactNode; className?: string })
  >;

export const IconButton = <C extends ElementType = 'button'>({
  as,
  buttonType = 'primary',
  children,
  className,
  circle = false,
  iconPath,
  ...props
}: IconButtonProps<C>) => {
  const Component = as || 'button';

  return (
    <Component
      className={cx(
        styles.container({
          buttonType,
          circle,
        }),
        className
      )}
      {...props}
    >
      <Icon path={iconPath} size={1.5} />
      {children}
    </Component>
  );
};
