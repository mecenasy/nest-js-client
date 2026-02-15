import React from 'react';
import { AddressField, PersonField, PersonFormData } from '~/src/store/person/constants';
import { useField } from 'react-final-form-hooks';
import StepButton from './StepButton';
import * as P from '../parts';
import { InputField } from '~/src/modules/Components/Input/InputWithLabel';
import { FormApi } from 'final-form';

const AddressFields = ({ form }: { form: FormApi<PersonFormData> }) => {
  const { input } = useField(PersonField.Step, form);

  if (input.value !== 3) {
    return null;
  }
  return (
    <P.FieldWrapper>
      <P.Title>Adres zamieszkania</P.Title>
      <InputField
        name={`${PersonField.Address}.${AddressField.Street}`}
        form={form}
        placeholder={'Ulica'}
      />
      <InputField
        name={`${PersonField.Address}.${AddressField.City}`}
        form={form}
        placeholder={'Miasto'}
      />
      <InputField
        name={`${PersonField.Address}.${AddressField.Country}`}
        form={form}
        placeholder={'Kraj'}
      />
      <InputField
        name={`${PersonField.Address}.${AddressField.Number}`}
        form={form}
        placeholder={'Numer domu'}
      />
      <InputField
        name={`${PersonField.Address}.${AddressField.ZipCode}`}
        form={form}
        placeholder={'Kod pocztowy'}
      />
      <StepButton form={form} />
    </P.FieldWrapper>
  )
};

export default AddressFields;
