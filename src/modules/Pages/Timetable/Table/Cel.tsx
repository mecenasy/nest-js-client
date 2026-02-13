import React, { Ref, useCallback, useContext } from 'react';
import * as P from '../parts';
import { useDrag } from 'react-dnd';
import { CalendarPlace } from '~/src/store/timeTable/constants';
import { useSelector } from 'react-redux';
import { userRoleSelector } from '~/src/store/auth/selectors';
import trash from '~/assets/trash.svg';
import { TableContext } from '../TableProvider';
import { RoleType } from '~/src/store/role/constants';

interface CelProps {
  cel: CalendarPlace
}

const Cel = ({ cel }: CelProps) => {
  const role = useSelector(userRoleSelector);
  const { removePlace } = useContext(TableContext);

  const onRemovePlace = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    removePlace(cel)
  }, [removePlace, cel]);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'table',
      canDrag: () => role === RoleType.Admin,
      item: cel,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  )
  return (
    <>
      <P.Cel
        onClick={(evt) => { evt.stopPropagation() }}
        $isOver={isDragging}
        ref={drag as unknown as Ref<HTMLTableCellElement>}
      >
        <P.CelTitle>{cel.subject.name}</P.CelTitle>
        <P.CelRow>
          Wykładowca:
          <P.CelElement>{cel.teacher.name}</P.CelElement>
        </P.CelRow>
        <P.CelRow>
          Audytorium
          <P.CelElement>{cel.auditorium}</P.CelElement>
        </P.CelRow>
        <P.Trash onClick={onRemovePlace} icon={trash} />
      </P.Cel>)
    </>)
}

export default Cel;
