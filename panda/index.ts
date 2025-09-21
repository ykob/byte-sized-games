import { type ExtendableTheme } from '@pandacss/types';
import { semanticTokens } from './semantic-tokens';
import { tokens } from './tokens';

export const extendableTheme: ExtendableTheme['extend'] = {
  tokens,
  semanticTokens,
};
