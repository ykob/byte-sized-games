import type { CssKeyframes } from '@pandacss/types';

export const keyframes: CssKeyframes = {
  explosionEffect: {
    '0%': {
      opacity: 0,
      transform: 'scale(1)',
    },
    '10%': {
      opacity: 1,
    },
    '60%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
      transform: 'scale(2)',
    },
  },
};
