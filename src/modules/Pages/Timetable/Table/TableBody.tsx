import React from 'react';
import TableRow from './TableRow';
import { useSelector } from 'react-redux';
import { getCalendarHours } from '~/src/store/timeTable/reducer';

const TableBody = () => {
  const hours = useSelector(getCalendarHours);

  return (
    <tbody>
      {hours.map((hour, index) => (
        <TableRow key={index} hour={hour} />
      ))}
    </tbody>
  )
};

export default TableBody;
