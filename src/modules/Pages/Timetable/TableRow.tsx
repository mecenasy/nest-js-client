import React, { FC } from 'react';
import * as P from './parts';
import { useSelector } from 'react-redux';
import { getCalendarDays } from '~/src/store/timeTable/selectors';
import TableCell from './TableCel';
import { CalendarPlace } from '~/src/store/timeTable/constants';

interface TableRowProps {
  hour: string;
  timeTable: CalendarPlace[];
}

const TableRow: FC<TableRowProps> = ({ hour, timeTable }) => {
  const days = useSelector(getCalendarDays);

  return (
    <P.TrRow >
      <P.TdHours >{hour}</P.TdHours>
      {days.map((day, index) => {
        const cel = timeTable.find(({ days, hours }) => days === day && hours === hour)
        return (
          <TableCell cel={cel} key={index} />
        )
      })}
    </P.TrRow>
  )
};

export default TableRow;
