import React from 'react';
import * as P from './parts';

const AppContainer = ({ children, }: { children: React.ReactNode; }) => (
  <P.AppContainer>
    {children}
  </P.AppContainer>
);

export default AppContainer;
