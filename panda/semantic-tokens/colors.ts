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
    primary: {
      text: { value: 'white' },
      bg: { value: '{colors.teal.500}' },
      bgHover: { value: '{colors.teal.400}' },
    },
    secondary: {
      text: { value: 'white' },
      bg: { value: '{colors.gray.800}' },
      bgHover: { value: '{colors.gray.600}' },
    },
    danger: {
      text: { value: 'white' },
      bg: { value: '{colors.violet.500}' },
      bgHover: { value: '{colors.violet.400}' },
    },
    disabled: {
      text: { value: '{colors.gray.400}' },
      bg: { value: '{colors.gray.200}' },
    },
  },
};
