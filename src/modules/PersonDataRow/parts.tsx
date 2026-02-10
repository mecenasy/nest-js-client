import styled from 'styled-components';

export const TitleRow = styled.span`
  margin: 0;
  font-weight: 600;
  text-wrap: nowrap;
  
  ::after{
    content: ':';
    margin-left: 2px;
  }
  `;

export const TitleData = styled.span`
  text-wrap: nowrap;
  margin: 0;
  font-weight: 500;
  text-align: end;
`;
