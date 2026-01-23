import styled from 'styled-components';
import BoxBase from '../../Components/Box/Box';
import DropzoneBase from '~/src/modules/Components/Input/Dropzone';
import DropdownBase from '~/src/modules/Components/Input/Dropdown';

export const PersonBox = styled(BoxBase)`

`;

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 16px;
`;

export const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   width: 670px;
   margin: auto;
   padding-top: 48px;
   margin-top: 48px;
`;

export const FieldWrapper = styled.div`
  width: 100%;
  padding: 24px 24px 0;
`;

export const PhotoWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

export const Dropzone = styled(DropzoneBase)`
  flex-direction: column;

  label {
    margin-right: 0;
  }
`;

export const Dropdown = styled(DropdownBase)`
  width: 66%;
`;

export const Button = styled.button`
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

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
`