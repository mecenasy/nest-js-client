import styled from 'styled-components';
import WhiteButton from '../../../Components/Buttons/IconButton';
import { animated } from '@react-spring/web';
import DropzoneBase from '../../../Components/Input/Dropzone';
import * as P from '../../../Components/Input/parts';

export const HeaderWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  margin: 0 -20px;
  padding: 0 12px;
`;

export const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 400px);
  min-height: 580px;
  overflow-y: scroll;
  background-color: #ededed;
  margin: 0 -20px -20px;
  padding: 0 20px;
`;

export const ContentWrapper = styled.div`
  background-color: white;
`;

export const MessageHeader = styled.h3<{ $isRead: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: ${({ $isRead }) => ($isRead ? 'normal' : 'bold')};
`;

export const Content = styled.div`
  font-size: 14px;
  border-bottom: 1px solid grey;
  padding: 12px 20px;
`;

export const Button = styled(WhiteButton)`
  min-width: 36px !important;
  height: 36px !important;
  width: 36px !important;
  margin-bottom: 0 !important;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 12px;
`;

export const FileButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const Time = styled.span`
  font-size: 12px;
`;

export const ReplyMessageWrapper = styled(animated.div)`
  position: absolute;
  overflow: hidden;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: white;
  display: flex;
  align-items: end;
`;

export const ReplyMessage = styled.div`
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: end;
  width: 100%;
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
