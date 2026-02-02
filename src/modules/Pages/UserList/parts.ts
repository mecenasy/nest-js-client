import styled from 'styled-components';
import { media } from '~/src/styles/media';

export const Wrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   max-width: 1200px;
   margin: auto;
   padding-top: 20px;
`;

export const RightColumn = styled.div`
   width: 100%;
   padding: 10px;

   ${media.greaterThan('xs')`
      width: 70%;
   `}
`;

export const ListWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
`;
