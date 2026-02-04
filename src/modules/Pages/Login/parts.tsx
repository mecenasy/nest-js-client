import styled from 'styled-components';
import { media } from '~/src/styles/media';
import BoxWithShadowBase from '../../Components/Box/Box';
import AlertBase from '../../Components/Alert/Alert';

export const Alert = styled(AlertBase)`
   margin-bottom: 16px;
`;

export const BoxWithShadow = styled(BoxWithShadowBase)`
  padding: 16px;
  flex-direction: column;
  align-items: center;

  ${media.greaterThan('xs')`
      padding: 32px;
  `}
`;

export const Title = styled.h1`
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