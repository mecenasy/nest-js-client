import styled from 'styled-components';

export const Dropzone = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   width: 64px;
   height: 64px;
   border: 1px dashed grey;
   border-radius: 4px;
   margin: 16px auto;

   &:hover {
      border: 1px dashed black;
   }
`;

export const Image = styled.img`
   width: 32px;
   height: 32px;;
`;

export const SubmitButton = styled.button`
   background-color: #b3d7ffab;
   cursor: pointer;
   width: 100%;
   border: none;
   height: 36px;
   border-radius: 4px;
   cursor: pointer;
   box-shadow: 1px 1px 4px 0px #6f8cab;
   margin-bottom: 8px;
   border: 1px solid #6f8cab;

   :active {
      box-shadow: -1px -1px 4px 0px #6f8cab;
   }
`;
