import React, { FC } from 'react';
import { Field, useField } from 'react-final-form';
import { PersonField } from '~/src/store/person/constants';
import StepButton from './StepButton';
import * as P from '../parts';
import { getDirectionSelector, getGroupSelector, getSpecialtySelector, getYearSelector } from '~/src/store/university/selectors';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/src/store/configuration/constants';
import { Direction, Group, Specialty, Year } from '~/src/store/university/constants';


const StudentFields: FC = () => {
  const { input } = useField(PersonField.Step, { subscription: { value: true } });
  const { input: specialtyInput } = useField(PersonField.Specialty, { subscription: { value: true } });
  const { input: directionInput } = useField(PersonField.Direction, { subscription: { value: true } });
  const { input: yearInput } = useField(PersonField.Year, { subscription: { value: true } });
  const { input: groupInput } = useField(PersonField.Group, { subscription: { value: true } });

  const direction = useSelector<ApplicationState, Direction[]>(
    (state => getDirectionSelector(state, specialtyInput.value)));
  const specialty = useSelector<ApplicationState, Specialty[]>(
    (state) => getSpecialtySelector(state, { directionId: directionInput.value, yearId: yearInput.value }));
  const year = useSelector<ApplicationState, Year[]>(
    (state) => getYearSelector(state, { specialtyId: specialtyInput.value, groupId: groupInput.value }));
  const group = useSelector<ApplicationState, Group[]>(
    (state) => getGroupSelector(state, { specialtyId: specialtyInput.value, yearId: yearInput.value }));

  const getOption = (data: any[]) => data?.map((item: any) => ({
    label: item.name,
    value: item.name,
  })) || [];


  if (input.value !== 2) {
    return null;
  }

  return (
    <P.FieldWrapper>
      <P.Title>Informacje studenckie</P.Title>
      <Field
        name={PersonField.Direction}
        component={P.Dropdown}
        options={getOption(direction)}
        placeholder={'Wydział'}
      />
      <Field
        name={PersonField.Specialty}
        component={P.Dropdown}
        options={getOption(specialty)}
        placeholder={'Specjalność'}
      />
      <Field
        name={PersonField.Year}
        component={P.Dropdown}
        placeholder={'Rok'}
        options={getOption(year)}
      />

      <Field
        name={PersonField.Group}
        component={P.Dropdown}
        placeholder={'Grupa'}
        options={getOption(group)}
      />
      <StepButton />
    </P.FieldWrapper>
  )
};

export default StudentFields;
