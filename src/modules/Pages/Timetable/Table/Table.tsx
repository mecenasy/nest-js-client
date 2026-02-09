import React, { FC } from 'react';
import * as P from '../parts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { CalendarPlace } from '~/src/store/timeTable/constants';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TableProvider } from '../TableProvider';
interface TableProps {
  year: string;
  name: string;
  timeTable: CalendarPlace[];
}

const Table: FC<TableProps> = (props) => (
  <DndProvider backend={HTML5Backend}>
    <TableProvider {...props}>
      <P.TableWrapper >
        <P.Table>
          <TableHeader />
          <TableBody />
        </P.Table>
      </P.TableWrapper>
    </TableProvider>
  </DndProvider>
);

export default Table;
