import React from 'react';
import { InputFormWrapper } from './Input';
import { InputFormWrapperProps, InputType } from './types';
import * as P from './parts';
import { useField } from 'react-final-form-hooks';
import { FormApi } from 'final-form';
export interface SubjectFieldsProps<T> {
  disabled?: boolean,
  name: string;
  form: FormApi<T, Partial<T>>;
  className?: string;
  placeholder: string,
  inputType: InputType
  label: string;
}

interface InputWithLabelProps<T> extends InputFormWrapperProps<T> {
  label: string;
}

const InputWithLabel = <T extends string | number | boolean | null | undefined | object>({
  label,
  ...rest
}: InputWithLabelProps<T>) => (
  <div>
    <P.Label>{label}</P.Label>
    <InputFormWrapper {...rest} label={label} />
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