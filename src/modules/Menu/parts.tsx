import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ $show: boolean }>`
   position: sticky;
   top: 0;
   display: flex;
   justify-content: space-between;
   width: 100%;
   background-color: #74aae0;
   box-shadow: 0 0 3px 1px #465b65;
   opacity: 0;
   transform: translateY(-100%);
   transition: all 300ms ease-in-out;
   z-index: 2;

   ${({ $show }) => $show && css`
      opacity: 1;
      transform: translateY(0);
   `}
`;

export const MenuWrapper = styled.div`
   display: flex;
   justify-content: flex-start;
   width: 100%;
`;

export const UserWrapper = styled.div`
   display: flex;
   justify-content: flex-end;
   width: 100%;
`;

export const MenuBurgerOverlay = styled.div`
   position: absolute;
   top:0;
   bottom:0;
   left:0;
   right:0;
   background-color: white;
   opacity: 0.3;
`;

