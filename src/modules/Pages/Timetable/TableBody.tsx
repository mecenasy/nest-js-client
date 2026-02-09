import React, { FC } from 'react';
import TableRow from './TableRow';
import { CalendarPlace } from '~/src/store/timeTable/constants';
import { useSelector } from 'react-redux';
import { getCalendarHours } from '~/src/store/timeTable/selectors';

interface TableBodyProps {
  timeTable: CalendarPlace[];
}

const TableBody: FC<TableBodyProps> = ({
  timeTable
}) => {
  const hours = useSelector(getCalendarHours);

  return (
    <tbody>
      {hours.map((hour, index) => (
        <TableRow key={index} hour={hour} timeTable={timeTable} />
      ))}
    </tbody>
  )
};

export default TableBody;
