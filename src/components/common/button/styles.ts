import { cva } from 'styled-system/css';

export const styles = {
  container: cva({
    base: {
      h: '2.4em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      rounded: '9999px',
      fontSize: '2xl',
      letterSpacing: '0.04em',
      transition: 'background-color 0.12s',
    },
    variants: {
      buttonType: {
        primary: {
          color: 'button.primary.text',
          bgColor: 'button.primary.bg',
          boxShadow: '0 3px 0 0 token(colors.button.primary.bevel)',
          _hover: {
            bgColor: 'button.primary.bgHover',
          },
        },
        secondary: {
          color: 'button.secondary.text',
          bgColor: 'button.secondary.bg',
          boxShadow: '0 3px 0 0 token(colors.button.secondary.bevel)',
          _hover: {
            bgColor: 'button.secondary.bgHover',
          },
        },
        danger: {
          color: 'button.danger.text',
          bgColor: 'button.danger.bg',
          boxShadow: '0 3px 0 0 token(colors.button.danger.bevel)',
          _hover: {
            bgColor: 'button.danger.bgHover',
          },
        },
      },
      circle: {
        true: {
          w: '2.4em',
        },
        false: {
          px: '1.2em',
        },
      },
    },
  }),
};
