import React from 'react';
import { PersonField, PersonFormData } from '~/src/store/person/constants';
import { useField } from 'react-final-form-hooks';
import * as P from '../parts';
import { useSelector } from 'react-redux';
import StepButton from './StepButton';
import { roleSelector } from '~/src/store/role/selectors';
import { InputField } from '~/src/modules/Components/Input/InputWithLabel';
import { FormApi } from 'final-form';
import { SelectField } from '~/src/modules/Components/Input/Dropdown';


const Default = ({ form }: { form: FormApi<PersonFormData> }) => {
  const roles = useSelector(roleSelector)
  const { input } = useField(PersonField.Step, form);

  if (input.value !== 1) {
    return null;
  }
  return (
    <P.FieldWrapper>
      <P.Title>Podstawowe informacje</P.Title>
      <InputField
        form={form}
        name={PersonField.Name}
        placeholder={'Imię'}
      />
      <InputField
        form={form}
        name={PersonField.Surname}
        placeholder={'Nazwisko'}
      />
      <InputField
        form={form}
        name={PersonField.Email}
        placeholder={'Email'}
      />
      <InputField
        form={form}
        name={PersonField.Phone}
        type={'number'}
        placeholder={'Numer telefonu'}
      />
      <P.PhotoWrapper>
        <P.Dropzone
          form={form as any}
          multiple={false}
          name={PersonField.Photo}
          label={'Zdjęcie profilowe'}
        />
        <SelectField
          form={form}
          name={PersonField.Role}
          options={roles}
          isMulti={false}
          label='Rola'
          placeholder={'Rola'}
        />
      </P.PhotoWrapper>
      <StepButton form={form} />
    </P.FieldWrapper>
  )
};

export default Default;
