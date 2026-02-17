import React, { createContext } from 'react';

interface GradesProviderProps {
  children: React.ReactNode;
  subjectId: string;
}

export const SubjectContext = createContext<string>('');

const SubjectProvider = ({ children, subjectId }: GradesProviderProps) => (
  <SubjectContext.Provider value={subjectId}>
    {children}
  </SubjectContext.Provider >
)


export default SubjectProvider;
