import React, { useCallback } from 'react';
import * as P from './parts';
import SubjectRow from './SybjectRow';
import { Subject } from '~/src/store/subject/constants';

interface SubjectItemProps {
  item: Subject;
  edit: (item: Subject) => void;
  remove: (id: string) => void;
}

const SubjectItem = ({ item, edit, remove }: SubjectItemProps) => {
  const onEdit = useCallback(() => { edit(item) }, [item, edit])
  const onRemove = useCallback(() => { remove(item.id) }, [remove, item.id])

  if (!item) {
    return null;
  }

  return (
    <P.BoxWithShadow key={item.id}>
      <div>
        <SubjectRow title={'Nazwa'} value={item.name} />
        <SubjectRow title={'Audytorium'} value={item.auditorium} />
        <SubjectRow title={'Wykładowca'} value={item.teacher?.name} />
      </div>
      <div>
        <SubjectRow
          title={'Grupy'}
          value={item.groups?.map(({ name }) => name).join(', ')}
        />
        <SubjectRow
          title={'Lata'}
          value={item.years?.map(({ name }) => name).join(', ')}
        />
        <SubjectRow
          title={'Specjalności'}
          value={item.specialties?.map(({ name }) => name).join(', ')}
        />
      </div>
      <P.Buttons
        onEdit={onEdit}
        onRemove={onRemove}
      />
    </P.BoxWithShadow>
  )
};

export default SubjectItem;
