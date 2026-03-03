import { zeroPadding } from './zero-padding';

export const SCORE_DISPLAY_LIMIT = 1000;
export const MAX_SCORE_TEXT = '999+';

export const formatScore = (score: number): string => {
  return score < SCORE_DISPLAY_LIMIT ? zeroPadding(score, 3) : MAX_SCORE_TEXT;
};
