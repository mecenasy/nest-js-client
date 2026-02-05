import styled, { css } from 'styled-components';
import { AlertType } from './types';

export const AlertWrapper = styled.div<{ $alertType: AlertType }>`
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  color: black;
  width: 100%;
  
  ${({ $alertType }) => {
    switch ($alertType) {
      case AlertType.error: {
        return css`
            border: 1px solid red;
            background: #fbe4e4;
            `;
      }
      case AlertType.info: {
        return css`
            border: 1px solid blue;
            background: #dedeff;
            `;
      }
      default: {
        return css`
            border: 1px solid yellow;
            background: #f7f7e2;
            `;
      }
    }
  }}
`;