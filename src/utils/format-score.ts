export const SCORE_DISPLAY_LIMIT = 1000;
export const MAX_SCORE_TEXT = '999+';

export const formatScore = (score: number): string | number => {
  return score < SCORE_DISPLAY_LIMIT ? score : MAX_SCORE_TEXT;
};
