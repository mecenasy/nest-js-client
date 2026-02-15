import styled from 'styled-components';
import { DropzoneField } from '~/src/modules/Components/Input/Dropzone';

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 800px;
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

export const Dropzone = styled(DropzoneField)`
  flex-direction: column;

  label {
    margin-right: 0;
  }
`;


export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
`