import React, { FC } from 'react';
import * as P from './parts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { CalendarPlace } from '~/src/store/timeTable/constants';

interface TableProps {
  year: string;
  name: string;
  timeTable: CalendarPlace[];
}

const Table: FC<TableProps> = ({
  name, year, timeTable
}) => (
  <P.TableWrapper>
    <P.Table>
      <TableHeader name={name} year={year} />
      <TableBody timeTable={timeTable} />
    </P.Table>
  </P.TableWrapper>
);

export default Table;
