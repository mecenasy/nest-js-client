import React, { FC } from 'react';
import * as P from './parts';
import { getCalendarDays } from '~/src/store/timeTable/selectors';
import { useSelector } from 'react-redux';

interface TableHeaderProps {
  name: string;
  year: string;
}

const TableHeader: FC<TableHeaderProps> = ({ name, year }) => {
  const days = useSelector(getCalendarDays);

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
