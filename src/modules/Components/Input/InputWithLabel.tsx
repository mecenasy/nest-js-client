import React from 'react';
import { InputFormWrapper } from './Input';
import { InputWithLabelProps, SubjectFieldsProps } from './types';
import * as P from './parts';
import { useField } from 'react-final-form-hooks';

const InputWithLabel = <T extends string | number | boolean | null | undefined | object>({
  label,
  ...rest
}: InputWithLabelProps<T>) => (
  <div>
    {label && <P.Label>{label}</P.Label>}
    <InputFormWrapper {...rest} />
  </div>
);

export default InputWithLabel;

export const InputField = <T extends string | number | boolean | null | undefined | object>(
  { form, name, ...rest }: SubjectFieldsProps<T>) => {
  const field = useField(name, form);

  return (
    <InputWithLabel
      {...field}
      {...rest}
    />
  )
}