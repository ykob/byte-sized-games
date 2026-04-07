import type { Recursive, SemanticToken } from '@pandacss/types';

export const zIndex: Recursive<SemanticToken<string, string>> = {
  game: {
    base: { value: '{zIndex.0}' },
    background: { value: '{zIndex.1}' },
    content: { value: '{zIndex.2}' },
    foreground: { value: '{zIndex.3}' },
    effect: { value: '{zIndex.10}' },
    ui: { value: '{zIndex.100}' },
    overlay: { value: '{zIndex.9999}' },
  },
};
