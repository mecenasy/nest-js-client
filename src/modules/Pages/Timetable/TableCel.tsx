import React from 'react';
import * as P from './parts';
import { CalendarPlace } from '~/src/store/timeTable/constants';

interface TableCellProps {
  cel?: CalendarPlace
}

const TableCell = ({ cel }: TableCellProps) => {
  if (cel) {
    const { subject, teacher, auditorium } = cel;

    return (
      <P.Td  >
        <P.Cel>
          <P.CelTitle>{subject.name}</P.CelTitle>
          <P.CelRow>
            Wykładowca:
            <P.CelElement>{teacher.name}</P.CelElement>
          </P.CelRow>
          <P.CelRow>
            Audytorium
            <P.CelElement>{auditorium}</P.CelElement>
          </P.CelRow>
        </P.Cel>
      </P.Td>
    )
  }
  return (
    <P.Td  >
      <div></div>
    </P.Td>
  )

};

export default TableCell;
