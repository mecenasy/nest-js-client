import styled from 'styled-components';
import { media } from '~/src/styles/media';

export const FormWrapper = styled.form`
  width: calc(100% - 16px);
   
  ${media.greaterThan('xs')`
    width: calc(100%);
  `}
`;