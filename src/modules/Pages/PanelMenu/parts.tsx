import styled from 'styled-components';
import PhotoBase from "../../Photo/Photo";
import BoxBase from '../../Components/Box/Box'

export const Wrapper = styled.div`
   padding: 12px;
   display: flex;
   flex-direction: column;
   gap: 16px;
`;

export const MenuPanelWrapper = styled.div`
   font-size: 12px;
   line-height: 16px;
`;

export const Photo = styled(PhotoBase)`
   width: 30px;
   height: 30px;
`;

export const Pen = styled(PhotoBase)`
   width: 16px;
   height: 16px;
`;

export const Box = styled(BoxBase)`
   align-items: start;
`;

export const BoxColumn = styled.div<{ $columnWidth: number, $direction?: 'row' | 'column' }>`
   margin-right: 16px;
   display: flex;
   ${({ $direction }) => $direction && ` flex-direction: ${$direction}`};
   width: ${({ $columnWidth }) => $columnWidth}px;
   &:last-child {
      margin: 0;
   }
`;

export const BoxInnerColumn = styled.div`
   margin-right: 16px;

   &:last-child {
      margin: 0;
   }
`;

export const AddItemText = styled.span`
  position: absolute;
  top: 8px;
  left: 34px;
`;

export const SortButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;
