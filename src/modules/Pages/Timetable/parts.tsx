import styled, { css } from 'styled-components';
import WhiteButton from '../../Components/Buttons/IconButton';

export const NodalContent = styled.div`
  height: 300px;

  .css-qr46ko,
  .css-1nmdiq5-menu {
    height: 220px;
  }

`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 800px;
  margin: auto;
`;
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: none;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const rowStyle = css`
  height: 40px;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  position: relative;
`;

export const TrRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(8, 140px);
  grid-gap: 2px;
  margin-bottom: 2px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
export const Th = styled.th`
  ${rowStyle};
`;

export const Td = styled.td`
  ${rowStyle};
`;

export const ThHours = styled(Th)`
  flex-direction: column;
  position: sticky;
  z-index: 2;
  left: 0;
`;

export const TdHours = styled(Td)`
  z-index: 2;
  position: sticky;
  left: 0;
`;

export const CelTitle = styled.div`
  font-size: 11px;
  transition: all 0.3s ease-in-out;
  margin-bottom: 0;
`;

export const CelRow = styled.div`
  font-size: 11px;
  height: 0;
  opacity: 0;
  text-wrap: nowrap;
  transition: all 0.3s ease-in-out;
`;

export const CelElement = styled.span`
  font-weight: bold;
`;

export const Trash = styled(WhiteButton)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  padding: 2px;
  position: absolute;
  right: 4px;
  bottom: 4px;
  opacity: 0;
`

export const Cel = styled.div<{ $isOver: boolean }>`
  background:  #eea2a2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
  z-index: 1;

  &:hover{
    ${({ $isOver }) => $isOver
    ? css`
      width: 100%;
      height: 100%;
      text-align: center;
      left: 0;
      top: 0;
    `
    : css`
      left: -25px;
      top: -25px;
      width: calc(100% + 60px);
      height: calc(100% + 50px);
      font-size: 12px;
      z-index: 3;
      border: 1px solid black;
      padding: 4px;
    
      ${CelTitle}{
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: bold;;
      }
      
      ${CelRow}{
        margin-bottom: 2px;
        opacity: 1;
        height: 12px;
      }

      ${Trash} {
        opacity: 1;

        &:active {
          top:unset;
          left: unset;
          right: 3px;
          bottom: 3px
        }
      }
    `}
  }
`;

export const ControlWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: start;
  margin-bottom: 16px;
`;

export const ButtonsWrapper = styled.div`
  padding: 16px 0;
`;

export const SelectWrapper = styled.div`
  width: 250px;
`;