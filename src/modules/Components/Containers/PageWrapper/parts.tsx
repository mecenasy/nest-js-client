import styled from 'styled-components';

export const Wrapper = styled.div<{ $pickUp: boolean }>`
   position: absolute;
   width: 100%;

   ${({ $pickUp }) => $pickUp && 'top: -56px;'}
`;

export const InnerWrapper = styled.div`
   display: flex;
   justify-content: center;
`;
