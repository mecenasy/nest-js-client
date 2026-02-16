import styled from 'styled-components';
import { BoxWithShadow } from '../../Components/Box/parts';


export const Header = styled.h1`
  
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  max-width: 800px;
  margin: auto;
  flex: 100%;
  overflow: visible;
`;

export const ListWrapper = styled.div`
  width: 100%;
`;

export const TeacherSection = styled(BoxWithShadow) <{ $hide: boolean }>`
  width: 100%;
  margin-bottom: 32px;
  padding: 24px;
  display: ${({ $hide }) => $hide ? 'none' : 'flex'};
  flex-direction: column;
  `;

export const InnerWrapper = styled.div`
  width: 100%;
`;

export const ConfirmButton = styled.button`
  align-self: flex-end;
  margin-top: 16px;
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: #219150;
  }
`;

export const FiltersWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-left: 12px;

  & > div {
    flex: 1 1 0;
  }
`;