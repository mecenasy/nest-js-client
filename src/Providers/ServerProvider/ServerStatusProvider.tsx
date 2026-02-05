import { createContext } from 'react';

export interface Status {
  url?: string;
  status?: number
}

export const ServerStatusContext = createContext<Status | undefined>(undefined);