import { cn } from '~/utils';

type ButtonType = 'primary' | 'secondary' | 'danger';

type ButtonStyleProps = {
  buttonType?: ButtonType;
  circle?: boolean;
};

const buttonTypeStyles: Record<ButtonType, string> = {
  primary: 'text-btn-primary-text bg-btn-primary-bg hover:bg-btn-primary-hover',
  secondary: 'text-btn-secondary-text bg-btn-secondary-bg hover:bg-btn-secondary-hover',
  danger: 'text-btn-danger-text bg-btn-danger-bg hover:bg-btn-danger-hover',
};

export const styles = {
  container: ({ buttonType = 'primary', circle = false }: ButtonStyleProps = {}) =>
    cn(
      'h-[3.2rem] flex items-center justify-center cursor-pointer rounded-full text-2xl tracking-[0.04em] transition-all duration-100',
      buttonTypeStyles[buttonType],
      circle ? 'w-[3.2rem]' : 'px-[1.6rem]'
    ),
};
