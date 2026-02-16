import React from 'react';
import { InputFormWrapper } from './Input';
import { InputFieldsProps } from './types';
import * as P from './parts';
import { useField } from 'react-final-form-hooks';

export const InputField = <T extends string | number | boolean | null | undefined | object, R extends object>(
  { label, form, name, ...rest }: InputFieldsProps<T, R>) => {
  const field = useField<string, T>(name, form);

  return (
    <div>
      {label && <P.Label>{label}</P.Label>}
      <InputFormWrapper
        {...field}
        {...rest}
      />
    </div>
  )
}