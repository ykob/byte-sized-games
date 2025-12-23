import { createContext, useContext, useState, type ReactNode } from 'react';

type PuzzleBoardContextValue = {
  puzzleBoardElement: HTMLElement | null;
  setPuzzleBoardElement: (element: HTMLElement | null) => void;
};

const PuzzleBoardContext = createContext<PuzzleBoardContextValue | null>(null);

export const PuzzleBoardProvider = ({ children }: { children: ReactNode }) => {
  const [puzzleBoardElement, setPuzzleBoardElement] = useState<HTMLElement | null>(null);

  return (
    <PuzzleBoardContext.Provider value={{ puzzleBoardElement, setPuzzleBoardElement }}>
      {children}
    </PuzzleBoardContext.Provider>
  );
};

export const usePuzzleBoard = () => {
  const context = useContext(PuzzleBoardContext);
  if (!context) {
    throw new Error('usePuzzleBoard must be used within a PuzzleBoardProvider');
  }
  return context;
};
