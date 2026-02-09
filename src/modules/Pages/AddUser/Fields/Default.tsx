import React, { FC } from 'react';
import InputFormWrapper from '~/src/modules/Components/Input/Input';
import { PersonField } from '~/src/store/person/constants';
import { Field, useField } from 'react-final-form';
import * as P from '../parts';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/src/store/configuration/constants';
import { Option } from '~/src/modules/Components/Input/types';
import { roleSelector } from '~/src/store/role/selectors';
import StepButton from './StepButton';
import DropdownField from '~/src/modules/Components/Input/Dropdown';

const Default: FC = () => {
  const roles = useSelector<ApplicationState, Option<string>[]>(roleSelector)
  const { input } = useField(PersonField.Step, { subscription: { value: true } });

  if (input.value !== 1) {
    return null;
  }
  return (
    <P.FieldWrapper>
      <P.Title>Podstawowe informacje</P.Title>
      <Field
        name={PersonField.Name}
        component={InputFormWrapper}
        placeholder={'Imię'}
      />
      <Field
        name={PersonField.Surname}
        component={InputFormWrapper}
        placeholder={'Nazwisko'}
      />
      <Field
        name={PersonField.Email}
        component={InputFormWrapper}
        placeholder={'Email'}
      />
      <Field
        name={PersonField.Phone}
        type={'number'}
        component={InputFormWrapper}
        placeholder={'Numer telefonu'}
      />
      <P.PhotoWrapper>
        <Field
          name={PersonField.Photo}
          component={P.Dropzone}
          label={'Zdjęcie profilowe'}
          type={'file'}
          placeholder={'Zdjęcie (URL)'}
        />
        <Field
          instanceId={'sdfsfdsdf'}
          name={PersonField.Role}
          component={DropdownField}
          options={roles}
          placeholder={'Rola'}
        />
      </P.PhotoWrapper>
      <StepButton />
    </P.FieldWrapper>
  )
};

export default Default;
