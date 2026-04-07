import type { Recursive, Token } from '@pandacss/types';

export const zIndex: Recursive<Token<string>> = {
  '0': { value: '0' },
  '1': { value: '1' },
  '2': { value: '2' },
  '3': { value: '3' },
  '10': { value: '10' },
  '100': { value: '100' },
  '9999': { value: '9999' },
};
