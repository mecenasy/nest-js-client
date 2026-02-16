import styled from 'styled-components';
import DropzoneBase from '../../../Components/Input/Dropzone';
import * as P from '../../../Components/Input/parts';

export const Dropzone = styled(DropzoneBase)`
  padding-top: 0;
  ${P.Dropzone} {
    height: 48px;
    width: 48px;
  }

  ${P.Label} {
    margin-right: 16px;
  }
`;
