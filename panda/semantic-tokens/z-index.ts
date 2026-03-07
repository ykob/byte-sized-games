import type { Recursive, SemanticToken } from '@pandacss/types';

export const zIndex: Recursive<SemanticToken<string, string>> = {
  game: {
    base: { value: '{zIndex.0}' },
    content: { value: '{zIndex.2}' },
    ui: { value: '{zIndex.10}' },
    overlay: { value: '{zIndex.9999}' },
  },
};
