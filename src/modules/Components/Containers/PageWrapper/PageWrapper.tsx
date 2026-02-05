import React from 'react';
import * as P from './parts';

interface PageWrapperProps {
  pickUp?: boolean;
  children?: React.ReactNode;
}

const PageWrapper = ({
  children,
  pickUp = false,
}: PageWrapperProps) => (
  <P.Wrapper $pickUp={pickUp}>
    <P.InnerWrapper>
      {children}
    </P.InnerWrapper>
  </P.Wrapper>
);

export default PageWrapper;
