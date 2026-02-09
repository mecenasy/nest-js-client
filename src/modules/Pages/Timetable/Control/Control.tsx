import React, { FC, useCallback, useState } from 'react';
import * as P from './parts';
import { useSelector } from 'react-redux';
import { getSpecialty, getYear } from '~/src/store/university/selectors';
import { CalendarType } from '~/src/store/timeTable/constants';
import { Option } from '../../Components/Input/types';
import { getTimeTableRequest } from '~/src/store/timeTable/actions';
import { useDispatch } from 'react-redux';
import { Button } from '../../Components/Buttons/Button';
import { Select } from '../../Components/Input/Dropdown';
import { Specialty, Year } from '~/src/store/university/constants';

interface ControlProps {

}

const Control: FC<ControlProps> = () => {
  const years = useSelector(getYear);
  const specialties = useSelector(getSpecialty);

  const dispatch = useDispatch();

  const [type, setType] = useState<CalendarType.Specialty | CalendarType.Year | ''>('');
  const [value, setValue] = useState<Option<string> | undefined>();
  const onChange = useCallback((option: Option<string>) => {
    if (type === CalendarType.Specialty) {
      dispatch(getTimeTableRequest({ specialty: option.value, type }))
    }
    if (type === CalendarType.Year) {
      dispatch(getTimeTableRequest({ year: option.value, type }))
    }
  }, [dispatch, type]);


  const onSpecialty = () => {
    setValue(undefined)
    setType(CalendarType.Specialty)
  }
  const onYear = () => {
    setValue(undefined)
    setType(CalendarType.Year)
  }
  const getOption = (data: Year[] | Specialty[]): Option<string>[] => {
    return data?.map((item: Year | Specialty) => ({
      label: item.name,
      value: item.name,
    }));
  };

  return (
    <P.ControlWrapper>
      <P.ButtonsWrapper>
        <Button onClick={onYear}>Pokaż grafik roku </Button>
        <Button onClick={onSpecialty}>Dodaj grafik specjalności</Button>
      </P.ButtonsWrapper>
      <P.SelectWrapper>

        {
          type && (
            <Select
              isMulti={false}
              label={type === CalendarType.Specialty ? 'Wybierz specjalność' : 'Wybierz rok'}
              name='select'
              options={getOption(type === 'specialty' ? specialties : years)}
              onChange={onChange}
              value={value}
            />)}
      </P.SelectWrapper>
    </P.ControlWrapper>
  )
};

export default Control;
