import styled from 'styled-components';

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
`;


export const InnerWrapper = styled.div`
   display: flex;
   align-items: center;
   padding: 10px;
   gap: 10px;
`;

export const Button = styled.button`
   background-color: #b3d7ffab;
   cursor: pointer;
   border: none;
   height: 36px;
   border-radius: 4px;
   cursor: pointer;
   box-shadow: 1px 1px 4px 0px #6f8cab;
   border: 1px solid #6f8cab;

   :active {
      box-shadow: -1px -1px 4px 0px #6f8cab;
   }
`;