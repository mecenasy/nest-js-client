import styled from 'styled-components';
import BoxBase from '../../Components/Box/Box';
import { media } from '~/src/styles/media';
import PhotoBase from "../../Photo/Photo";

export const Col = styled.div`
   width: ${1 / 2 * 100}%;
   justify-content: center;
   display: flex;
   flex-wrap: wrap;

   &:nth-child(2n+0) {
      padding-right: 10px;
   }

   &:nth-child(2n+1) {
      padding-left: 10px;
   }

   ${media.greaterThan('xxs')`
      width: ${1 / 3 * 100}%;
      &:nth-child(2n+0) {
      padding-right: 0;
   }

   &:nth-child(2n+1) {
      padding-left: 0;
   }
      &:nth-child(3n+0) {
         padding-right: 50px;
      }

      &:nth-child(3n+1) {
         padding-left: 50px;
      }
   `}
`;

export const BoxUser = styled(BoxBase)`
   width: 100%;
   height: 120px;
   justify-content: flex-start;
   background-color: #c9e4ff;

   ${media.greaterThan('xs')`
      height: 200px;
   `}

   &:hover {
      background-color: #aed3f8;
   }
`;

export const Photo = styled(PhotoBase)`
  
`;

export const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
   width: 670px;
   margin: auto;
`;

export const Row = styled.div`
   display: flex;
   flex-wrap: wrap;
   width: 100%;

   ${media.greaterThan('xs')`
      padding-top: 50px;
     
      &:last-child {
         padding: 0;
      }
   `}
`;
