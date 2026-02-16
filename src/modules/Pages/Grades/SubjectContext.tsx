import React, { createContext } from 'react';
import { FormRenderProps, useForm } from 'react-final-form-hooks';

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
