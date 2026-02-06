import styled, { css, } from 'styled-components';
import BoxBase from '../Components/Box/Box';
import { Link as LinkBase } from "react-router-dom";
import { media } from '../../styles/media';

interface LinkProps {
  $isSmall: boolean;
  $isHidden: boolean;
  as: string | undefined
}

export const Link = styled(LinkBase) <LinkProps>`
  background: none;
  border: none;
  text-decoration: none;
  padding: 0;
  color: black;
  font-size: 14px;
  outline: none;

  ${media.greaterThan('xs')`
    font-size: 16px;
  `}

  &:active, :visited, :hover {
    color: black;
  }

  ${({ $isHidden }) => $isHidden && css`
    display: none;
  `}

  ${({ $isSmall }) => $isSmall && css`
    margin: 8px;

    ${Box} {
      width: 36px;
      height: 36px;
      margin: 0;
    }

    ${Image} {
      width: 20px;
      height: 20px;
      margin: 0;
    }
  `}
`;

export const Box = styled(BoxBase)`
  width: 130px;
  height: 130px;
  background-color: #c9e4ff;
  flex-direction: column;

  ${media.greaterThan('xs')`
    width: 180px;
    height: 180px;
  `} 
  
  &:hover {
    background-color: #aed3f8;
  }
`;

export const Counter = styled.div<{ $isSmall: boolean }>`
  position: absolute;
  background: red;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  
  ${({ $isSmall }) => $isSmall
    ? css`
      width: 18px;
      height: 18px;
      border-radius: 8px;
      font-size: 10px;
      top: -8px;
      right: -8px;
      `
    : css`
      width: 24px;
      height: 24px;
      border-radius: 12px;
      font-size: 12px;
      top: -12px;
      right: -12px;
    `
  }
`;
export const Image = styled.img`
  width: 70px;
  height: 70px;

  ${media.greaterThan('xs')`
    margin-bottom: 20px;
  `} 
`;

export const Text = styled.div``;
