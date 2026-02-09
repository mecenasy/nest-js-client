import React, { useContext } from 'react';
import * as P from '../parts';
import { getCalendarDays } from '~/src/store/timeTable/selectors';
import { useSelector } from 'react-redux';
import { TableContext } from '../TableProvider';

const TableHeader = () => {
  const days = useSelector(getCalendarDays);
  const { name, year } = useContext(TableContext)
  return (
    <thead>
      <P.TrRow>
        <P.ThHours>
          <div>Grupa: {name}</div>
          <div>Rok: {year}</div>
        </P.ThHours>
        {days.map((day, index) => (
          <P.Th key={index + day} >{day}</P.Th>
        ))}
      </P.TrRow>
    </thead>
  )
};

export default TableHeader;
