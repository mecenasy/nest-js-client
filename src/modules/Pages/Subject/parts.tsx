import styled from 'styled-components';
import BoxWithShadowBase from '../../Components/Box/Box';
import { animated } from '@react-spring/web';
import WhiteButton from '../../Components/Buttons/IconButton';
import ActionButtons from '../../Components/ActionButons/ActionButtons';

export const BoxWithShadow = styled(BoxWithShadowBase)`
  padding: 16px;
  width: 49%;
  align-items: center;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 30px;
`;

export const Title = styled.h2`
  margin: 4px;
   text-align: center;
`;

export const SubTitle = styled.h4`
  text-align: center;
`;

export const WrapperAlert = styled.div`
  height: 50px;
  width: 100%;
  margin: 4px 0 12px;
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Animated = styled(animated.div)`
  height: 60px;
  display: flex;
  gap: 8px;
  padding-left: 16px;
`;

export const Button = styled(WhiteButton)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 8px;
  margin-top: 24px;
`;

export const SubjectWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-flow: wrap;
  gap: 12px;
  max-width: 1200px;
`;

export const SubjectTitle = styled.span`
  font-weight: bold;
`;

export const SubjectRow = styled.p`
  margin: 2px;
  font-size: 14px;
`;

export const Buttons = styled(ActionButtons)`
  width: 36px; 

  button {
    width: 36px;
    height: 36px;
    min-width: 36px;
    padding: 8px;
  }
`

