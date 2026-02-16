import styled from 'styled-components';
import { Button } from '~/src/modules/Components/Buttons/IconButton';
import { BoxWithShadow } from '../../ChangePassword/parts';

export const GradesRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const GradeBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 8px;
`;

export const Grade = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const Date = styled.p`
  margin: 0;
  font-size: 10px;
  font-weight: normal;
`;

export const SubjectContainer = styled(BoxWithShadow)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
`;

export const SubjectName = styled.h3`
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  color: #333;
`;


export const GradeInput = styled.input`
  width: 100%;
  height: 36px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const NewGradeWrapper = styled.div`
  margin-left: auto;
  position: relative;
  margin-right: 8px;
  cursor: pointer;
  width: 120px;
  height: 40px;
`;

export const GradeItemWrapper = styled.div`
  position: relative;
  margin-right: 8px;
  cursor: pointer;
  width: 80px;

  ${Button}{
    display: none;
  
  }

  &:hover {
    ${Button}{
      display: flex;
      position: absolute;
      width: 20px;
      height: 20px;
      min-width: 20px;
      padding: 3px;
      top: -7px;
      right: -7px;
      
      &:active {
        top: -6px;
        right: -8px;
        left: unset;
      }
    }
  }
`;

export const NewGradeButton = styled.button`
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: #2980b9;
  }
`;

export const StudentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const StudentName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 8px;
  color: #444;
`;

export const GradesFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
