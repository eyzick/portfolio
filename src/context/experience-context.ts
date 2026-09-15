import { createContext } from 'react';

export interface ExperienceContextValue {
  isOnline: boolean;
  offGrid: boolean;
  tapSignal: () => void;
  beginExit: (href: string) => void;
}

export const ExperienceContext = createContext<ExperienceContextValue | null>(null);
