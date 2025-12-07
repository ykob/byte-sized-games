import { type ExtendableTheme } from '@pandacss/types';
import { semanticTokens } from './semantic-tokens';
import { tokens } from './tokens';

export * from './global-css';

export const extendableTheme: ExtendableTheme['extend'] = {
  tokens,
  semanticTokens,
};
