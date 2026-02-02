import styled from 'styled-components';
import { media } from '~/src/styles/media';

export const LeftColumn = styled.div`
   width: 100%;
   padding: 10px;
   
   ${media.greaterThan('xs')`
      width: 300px;
   `}
`;