import styled from 'styled-components';
import { media } from '~/src/styles/media';
import PersonBoxBase from '../Home/PersonBox';
import { DataWrapper } from '../Home/parts';

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
`;

export const PersonBox = styled(PersonBoxBase)`
  height: 80px;
  width: unset;
  transition: all 0.5s ease-in-out;

  ${DataWrapper} {
    transition: all 0.5s ease-in-out;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  &:hover {
    height: 120px;

    ${DataWrapper} {
      opacity: 1;
      height: 80px;
    }
  }
`;
