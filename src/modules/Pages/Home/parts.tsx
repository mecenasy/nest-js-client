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
   height: 140px;
   justify-content: flex-start;
   background-color: #c9e4ff;
   width: 100%;
   gap: 16px;
   
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
   width: 800px;
   margin: auto;
`;

export const ContentWrapper = styled.div`
   display: flex;
   flex-direction: column;
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

export const DataWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const DataColumn = styled.div`
  font-size: 12px;
  display: grid;
  grid-template-columns:  1fr 1fr;
`;

export const NameWrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
  gap: 16px;
`