import styled, { css } from 'styled-components';


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
  z-index: 1;
  left: 0;
`;

export const TdHours = styled(Td)`
  z-index: 1;
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
`

export const Cel = styled.div`
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

  &:hover{
    background: #eea2a2;
    position: absolute;
    left: -25px;
    top: -25px;
    width: calc(100% + 60px);
    height: calc(100% + 50px);
    font-size: 12px;
    z-index: 2;
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
  }
`;

// font-size: 14px;
//     margin-bottom: 4px;
//     font-weight: bold;

// }