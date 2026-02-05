
import React from 'react';
import { BoxWithShadow } from './parts';

interface BoxWithShadowProps {
  className?: string;
  children?: React.ReactNode;
}

const Box = ({
  children,
  className,
}: BoxWithShadowProps) => (
  <BoxWithShadow className={className}>
    {children}
  </BoxWithShadow>
);

export default Box;
