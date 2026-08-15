import { cva } from 'class-variance-authority';

export const styles = {
  container: cva(
    'h-[3.2rem] flex items-center justify-center cursor-pointer rounded-full text-2xl tracking-[0.04em] transition-all duration-100',
    {
      variants: {
        buttonType: {
          primary: 'text-btn-primary-text bg-btn-primary-bg hover:bg-btn-primary-hover',
          secondary: 'text-btn-secondary-text bg-btn-secondary-bg hover:bg-btn-secondary-hover',
          danger: 'text-btn-danger-text bg-btn-danger-bg hover:bg-btn-danger-hover',
        },
        circle: {
          true: 'w-[3.2rem]',
          false: 'px-[1.6rem]',
        },
      },
      defaultVariants: {
        buttonType: 'primary',
        circle: false,
      },
    }
  ),
};
