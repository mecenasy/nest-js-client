import React from 'react';
import { useField } from 'react-final-form-hooks';
import { PersonField, PersonFormData } from '~/src/store/person/constants';
import StepButton from './StepButton';
import * as P from '../parts';
import {
  getDirectionSelector,
  getGroupSelector,
  getSpecialtiesSelector,
  getYearSelector
} from '~/src/store/university/reducer';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/src/store/configuration/constants';
import { Direction, Group, Specialty, Year } from '~/src/store/university/constants';
import { SelectField } from '~/src/modules/Components/Input/Dropdown';
import { FormApi } from 'final-form';


const StudentFields = ({ form }: { form: FormApi<PersonFormData> }) => {
  const { input } = useField(PersonField.Step, form);
  const { input: specialtyInput } = useField(PersonField.Specialty, form);
  const { input: directionInput } = useField(PersonField.Direction, form);
  const { input: yearInput } = useField(PersonField.Year, form);
  const { input: groupInput } = useField(PersonField.Group, form);

  const direction = useSelector<ApplicationState, Direction[]>(
    (state => getDirectionSelector(state, specialtyInput.value)));
  const specialty = useSelector<ApplicationState, Specialty[]>(
    (state) => getSpecialtiesSelector(state, { directionId: directionInput.value, yearId: yearInput.value }));
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
      <SelectField
        name={PersonField.Direction}
        label={'Kierunek'}
        form={form}
        isMulti={false}
        options={getOption(direction)}
        placeholder={'Wydział'}
      />
      <SelectField
        name={PersonField.Specialty}
        label={'Specjalność'}
        form={form}
        isMulti={false}
        options={getOption(specialty)}
        placeholder={'Specjalność'}
      />
      <SelectField
        name={PersonField.Year}
        label={'Rok'}
        form={form}
        isMulti={false}
        placeholder={'Rok'}
        options={getOption(year)}
      />
      <SelectField
        name={PersonField.Group}
        label={'Grupa'}
        form={form}
        isMulti={false}
        placeholder={'Grupa'}
        options={getOption(group)}
      />
      <StepButton form={form} />
    </P.FieldWrapper>
  )
};

export default StudentFields;
