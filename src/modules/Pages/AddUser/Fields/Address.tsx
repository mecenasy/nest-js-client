import React, { FC } from 'react';
import { AddressField, PersonField } from '~/src/store/person/constants';
import InputFormWrapper from '~/src/modules/Components/Input/Input';
import { Field, useField } from 'react-final-form';
import StepButton from './StepButton';
import * as P from '../parts';

const AddressFields: FC = () => {
  const { input } = useField(PersonField.Step, { subscription: { value: true } });

  if (input.value !== 3) {
    return null;
  }
  return (
    <P.FieldWrapper>
      <P.Title>Adres zamieszkania</P.Title>
      <Field
        name={`${PersonField.Address}.${AddressField.Street}`}
        component={InputFormWrapper}
        placeholder={'Ulica'}
      />
      <Field
        name={`${PersonField.Address}.${AddressField.City}`}
        component={InputFormWrapper}
        placeholder={'Miasto'}
      />
      <Field
        name={`${PersonField.Address}.${AddressField.Country}`}
        component={InputFormWrapper}
        placeholder={'Kraj'}
      />
      <Field
        name={`${PersonField.Address}.${AddressField.Number}`}
        component={InputFormWrapper}
        placeholder={'Numer domu'}
      />
      <Field
        name={`${PersonField.Address}.${AddressField.ZipCode}`}
        component={InputFormWrapper}
        placeholder={'Kod pocztowy'}
      />
      <StepButton />
    </P.FieldWrapper>
  )
};

export default AddressFields;
