import React, { FC, useContext } from 'react';
import * as P from '../parts';
import { useSelector } from 'react-redux';
import { getCalendarDays } from '~/src/store/timeTable/reducer';
import TableCell from './TableCel';
import { TableContext } from '../TableProvider';

interface TableRowProps {
  hour: string;
}

const TableRow: FC<TableRowProps> = ({ hour }) => {
  const days = useSelector(getCalendarDays);
  const { timeTable } = useContext(TableContext);

  return (
    <P.TrRow >
      <P.TdHours >{hour}</P.TdHours>
      {days.map((day, index) => {
        const cel = timeTable.find(({ days, hours }) => days === day && hours === hour)
        return (
          <TableCell cel={cel} hour={hour} day={day} key={index} />
        )
      })}
    </P.TrRow>
  )
};

export default TableRow;
