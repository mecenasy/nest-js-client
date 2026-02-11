import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
}

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: string;
}

export const Image = styled.img`
  height: 100%;
`;
const styles = css< { $isCenter?: boolean }>`
  grid-area: add;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 0 6px 0 #74aae0;
  position: relative;
  height: 48px;
  min-width: 48px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 6px;
  background: white;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 8px;
  ${({ $isCenter }) => $isCenter && css`justify-content: center;`}

  &:last-child {
      margin-bottom: 0;
  }

  &:hover{
    background-color: #e9eef8f0;
  }
  
  &:active {
    background-color: #e9eef8f0;
    top: 1px;
    left: 1px;
  }
`;


export const Button = styled.button<{ $isCenter?: boolean }>`
  ${styles}
`;

const Link = styled.a<{ $isCenter?: boolean }>`
  ${styles}
`;

const WhiteButton: FC<IconButtonProps> = ({
  title,
  icon,
  onClick,
  className,
  ...rest
}) => (
  <Button onClick={onClick} className={className} {...rest}>
    {icon && <Image src={icon} />}
    {title}
  </Button >
);

export const WhiteButtonAsLink: FC<IconLinkProps> = ({
  title,
  icon,
  onClick,
  className,
  ...rest
}) => (
  <Link onClick={onClick} className={className} {...rest}>
    {icon && <Image src={icon} />}
    {title}
  </Link >
);

export default WhiteButton;
