import React, { FC } from 'react';
import * as P from './parts';
import { AlertType } from './types';

interface AlertProps {
  className?: string
  message: string;
  type: AlertType;
}

const Alert: FC<AlertProps> = ({
  className,
  message,
  type,
}) => {
  return (
    <P.AlertWrapper className={className} alertType={type}>
      {message}
    </P.AlertWrapper>
  )
};

export default Alert;
