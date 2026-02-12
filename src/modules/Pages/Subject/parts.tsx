import styled from 'styled-components';
import BoxWithShadowBase from '../../Components/Box/Box';
import WhiteButton from '../../Components/Buttons/IconButton';
import ActionButtons from '../../Components/ActionButons/ActionButtons';
import { Input } from '../../Components/Input/Input';

export const BoxWithShadow = styled(BoxWithShadowBase)`
  padding: 16px;
  width: 49%;
  align-items: center;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 30px;
`;

export const Title = styled.h2`
  grid-area: header;
  margin: 4px;
  text-align: center;
`;

export const Search = styled.div`
  grid-area: search;
`;


export const AddButton = styled(WhiteButton)`
  grid-area: add;
  justify-self: end;
  height: 40px;
  width: 250px;
`;

export const SubTitle = styled.h4`
  margin: 4px 0;
`;

export const SearchInput = styled(Input)`
  width: 250px;
`

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const SubjectWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-flow: wrap;
  gap: 12px;
  max-width: 1200px;
`;

export const SubjectTitle = styled.span`
  font-weight: bold;
`;

export const SubjectRow = styled.p`
  margin: 2px;
  font-size: 14px;
`;

export const Buttons = styled(ActionButtons)`
  width: 36px; 

  button {
    width: 36px;
    height: 36px;
    min-width: 36px;
    padding: 8px;
  }
`;

export const ControlWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  align-items: end;
  grid-template-areas: 
    'header header'
    'search add'
    ;
`;


