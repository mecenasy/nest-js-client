import React, { useState } from 'react';
import { createContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addSubjectToTimeTableRequest, deleteSubjectFromTimeTableRequest, moveSubjectInTimeTableRequest } from '~/src/store/timeTable/actions';
import { CalendarPlace, GroupTimeTable } from '~/src/store/timeTable/constants';
import { getSubjectSelector } from '~/src/store/subject/selectors';
import { ApplicationState } from '~/src/store/configuration/constants';
import { useSelector } from 'react-redux';
import { Option } from '../../Components/Input/types';
import { Subject } from '~/src/store/subject/constants';
import { getSpecialtySelector } from '~/src/store/university/selectors';
import AddSubjectModal from './AddSubject/AddSubjectModal';

interface TableProviderProps extends GroupTimeTable {
  children: React.ReactNode;
}

interface TableContext extends GroupTimeTable {
  onMoveSubject: (item: CalendarPlace, newDays: string, newHours: string) => void;
  removePlace: (item: CalendarPlace) => void;
  addPlace: (day: string, hour: string) => void;
}
export const TableContext = createContext<TableContext>({
  name: '',
  year: '',
  timeTable: [],
  onMoveSubject: () => {},
  removePlace: () => {},
  addPlace: () => {},
});


export const TableProvider = ({ children, name, timeTable, year }: TableProviderProps) => {
  const dispatch = useDispatch();
  const subjects = useSelector((state: ApplicationState) => getSubjectSelector(state, { group: name, year }))
  const specialty: string = useSelector((state: ApplicationState) => getSpecialtySelector(state, name))
  const [place, setPlace] = useState<{ day: string, hour: string } | undefined>(undefined);

  const onClose = useCallback(() => {
    setPlace(undefined)
  }, []);

  const onMoveSubject = useCallback((item: CalendarPlace, newDays: string, newHours: string) => {
    dispatch(moveSubjectInTimeTableRequest({
      group: name,
      year,
      data: {
        ...item,
        newDays,
        newHours,
        newAuditorium: item.auditorium,
        subject: item.subject.id,
        teacher: item.teacher.id,
      }
    }))
  }, [dispatch, year, name]);



  const addPlace = useCallback((day: string, hour: string) => {
    setPlace({ day, hour })

  }, [dispatch, year, name]);

  const removePlace = useCallback((item: CalendarPlace) => {
    dispatch(deleteSubjectFromTimeTableRequest({
      group: item.group,
      year: item.year,
      specialty: item.specialty,
      subject: item.subject.id,
      teacher: item.teacher.id,
      auditorium: item.auditorium,
      days: item.days,
      hours: item.hours,
    }))
  }, [dispatch]);

  const onChangePlace = useCallback(({ value }: Option<Subject>) => {
    if (place) {
      dispatch(addSubjectToTimeTableRequest({
        group: name,
        year,
        specialty: specialty,
        subject: value.id,
        teacher: value.teacher.id,
        auditorium: value.auditorium,
        days: place.day,
        hours: place.hour,
      }))
    }
  }, [dispatch, name, year, specialty, place]);


  return (
    <TableContext.Provider value={{ onMoveSubject, addPlace, removePlace, name, timeTable, year }}>
      {children}

      <AddSubjectModal
        onChangePlace={onChangePlace}
        onClose={onClose}
        place={place}
        subjects={subjects}
      />
    </TableContext.Provider>
  )
}