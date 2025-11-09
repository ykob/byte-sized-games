import { cva } from 'styled-system/css';

export const styles = {
  container: cva({
    base: {
      h: '2.4em',
      px: '1.2em',
      cursor: 'pointer',
      rounded: '9999px',
      fontSize: '2xl',
      letterSpacing: '0.04em',
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
