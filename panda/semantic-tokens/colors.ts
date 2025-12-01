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
      bevel: { value: '{colors.teal.700}' },
      bevelHover: { value: '{colors.teal.600}' },
    },
    secondary: {
      text: { value: 'white' },
      bg: { value: '{colors.gray.800}' },
      bgHover: { value: '{colors.gray.700}' },
      bevel: { value: '{colors.gray.950}' },
      bevelHover: { value: '{colors.gray.900}' },
    },
    danger: {
      text: { value: 'white' },
      bg: { value: '{colors.violet.500}' },
      bgHover: { value: '{colors.violet.400}' },
      bevel: { value: '{colors.violet.700}' },
      bevelHover: { value: '{colors.violet.600}' },
    },
    disabled: {
      text: { value: '{colors.gray.400}' },
      bg: { value: '{colors.gray.200}' },
      bevel: { value: '{colors.gray.300}' },
    },
  },
};
