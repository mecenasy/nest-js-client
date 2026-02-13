import React, { Ref, useCallback, useContext } from 'react';
import * as P from '../parts';
import { CalendarPlace } from '~/src/store/timeTable/constants';
import { useDrop } from 'react-dnd';
import Cel from './Cel';
import { useSelector } from 'react-redux';
import { userRoleSelector } from '~/src/store/auth/selectors';
import { TableContext } from '../TableProvider';
import { RoleType } from '~/src/store/role/constants';

interface TableCellProps {
  hour: string;
  day: string;
  cel?: CalendarPlace
}

const TableCell = ({ cel, day, hour }: TableCellProps) => {
  const { onMoveSubject, addPlace } = useContext(TableContext);
  const role = useSelector(userRoleSelector);

  const dropHandler = useCallback((item: CalendarPlace) => {
    onMoveSubject(item, day, hour);
  }, [onMoveSubject, day, hour]);

  const onAddPace = useCallback(() => {
    addPlace(day, hour);
  }, [addPlace, day, hour]);

  const [, drop] = useDrop(
    () => ({
      accept: 'table',
      canDrop: () => !cel,
      drop: dropHandler,
    }),
    [],
  )

  return (
    <P.Td
      ref={drop as unknown as Ref<HTMLTableCellElement>}
      onClick={role === RoleType.Admin && !cel ? onAddPace : undefined}
    >
      {cel && <Cel cel={cel} />}

    </P.Td>
  )
}

export default TableCell;
