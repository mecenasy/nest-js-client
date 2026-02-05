import styled, { css } from 'styled-components';
import Box from '../../Components/Box/Box';
import WhiteButton from '../../Components/Buttons/IconButton';
import DropzoneBase from '../../Components/Input/Dropzone';
import * as P from '../../Components/Input/parts';


export const AddButton = styled(WhiteButton)`
  grid-area: add;
  margin-top: 12px;
`;

export const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-areas: 
  'empty header'
  'add content';
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  grid-gap: 8px;
`;

export const Header = styled.h2`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 12px;
`;

export const MessageList = styled(Box)`
  grid-area: content;
  display: flex;
  flex-direction: column;
  gap: 4px 10px;
`;

export const MessageRow = styled(WhiteButton) <{ isReaded: boolean }>`
  font-size: 14px;
  ${({ isReaded }) => !isReaded && css`font-weight: bold;`}
`;

export const Dropzone = styled(DropzoneBase)`
  padding-top: 0;
  ${P.Dropzone} {
    height: 48px;
    width: 48px;
  }

  ${P.Label} {
    margin-right: 16px;
  }
`;