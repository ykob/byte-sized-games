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
      transition: '0.12s',
    },
    variants: {
      buttonType: {
        primary: {
          color: 'button.primary.text',
          bgColor: 'button.primary.bg',
          _hover: {
            bgColor: 'button.primary.bgHover',
          },
        },
        secondary: {
          color: 'button.secondary.text',
          bgColor: 'button.secondary.bg',
          _hover: {
            bgColor: 'button.secondary.bgHover',
          },
        },
        danger: {
          color: 'button.danger.text',
          bgColor: 'button.danger.bg',
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
