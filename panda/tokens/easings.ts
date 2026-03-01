import type { Recursive, Token } from '@pandacss/types';

export const easings: Recursive<Token<string | number[]>> = {
  default: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },

  // Sine
  'ease-in-sine': { value: 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
  'ease-out-sine': { value: 'cubic-bezier(0.39, 0.575, 0.565, 1)' },
  'ease-in-out-sine': { value: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)' },

  // Quad
  'ease-in-quad': { value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)' },
  'ease-out-quad': { value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
  'ease-in-out-quad': { value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' },

  // Cubic
  'ease-in-cubic': { value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' },
  'ease-out-cubic': { value: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
  'ease-in-out-cubic': { value: 'cubic-bezier(0.645, 0.045, 0.355, 1)' },

  // Quart
  'ease-in-quart': { value: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)' },
  'ease-out-quart': { value: 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
  'ease-in-out-quart': { value: 'cubic-bezier(0.77, 0, 0.175, 1)' },

  // Quint
  'ease-in-quint': { value: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)' },
  'ease-out-quint': { value: 'cubic-bezier(0.23, 1, 0.32, 1)' },
  'ease-in-out-quint': { value: 'cubic-bezier(0.86, 0, 0.07, 1)' },

  // Expo
  'ease-in-expo': { value: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)' },
  'ease-out-expo': { value: 'cubic-bezier(0.19, 1, 0.22, 1)' },
  'ease-in-out-expo': { value: 'cubic-bezier(1, 0, 0, 1)' },

  // Circ
  'ease-in-circ': { value: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)' },
  'ease-out-circ': { value: 'cubic-bezier(0.075, 0.82, 0.165, 1)' },
  'ease-in-out-circ': { value: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)' },

  // Back
  'ease-in-back': { value: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)' },
  'ease-out-back': { value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  'ease-in-out-back': { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
};
