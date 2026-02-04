import styled from 'styled-components';
import WhiteButton from '../Buttons/IconButton';

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  line-height: 20px;
`;

export const TitleWrapper = styled.div`
  border-bottom: 1px solid grey;
  margin: 0 -20px;
  padding: 4px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled(WhiteButton)`
  min-width: 40px !important;
  width: 40px !important;
  height: 40px !important;
  margin: 8px 0;
  margin-bottom: 8px !important;
`;
