import type { Recursive, SemanticToken } from '@pandacss/types';

export const colors: Recursive<SemanticToken<string, string>> = {
  text: {
    DEFAULT: { value: '{colors.gray.950}' },
    secondary: { value: '{colors.gray.700}' },
  },
  bg: {
    DEFAULT: { value: '{colors.teal.50}' },
    secondary: { value: '{colors.teal.100}' },
  },
  button: {
    text: { value: 'white' },
    bg: { value: '{colors.teal.500}' },
    bevel: { value: '{colors.teal.700}' },
  },
};
