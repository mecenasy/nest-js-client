import React from 'react';
import * as P from './parts';
import { DropdownProps, SelectFieldProps, SelectProps } from './types';
import SelectBase from 'react-select';
import { useField } from 'react-final-form-hooks';

export const Select = <T extends string | number | boolean | null | undefined | object>({
  onChange,
  value,
  label,
  className,
  options,
  ...rest
}: SelectProps<T>) => (
  <P.DropdownWrapper className={className}>
    <P.Label>{label}</P.Label>
    <SelectBase
      onChange={onChange}
      value={value}
      options={options}
      defaultValue={value}
      styles={{ control: (prov) => ({ ...prov, border: '1px solid black', borderRadius: '8px' }) }}
      {...rest}
    />
  </P.DropdownWrapper>
);

const DropdownField = <T extends string | number | boolean | null | undefined | object>({
  input: { onChange, value },
  options,
  className,
  name,
  ...rest
}: DropdownProps<T>) => {

  return (
    <Select
      onChange={onChange}
      value={value}
      options={options}
      className={className}
      defaultValue={value}

      name={name ?? ''}
      {...rest}
    />
  )
};

export const SelectField = <T extends string | number | boolean | null | undefined | object, R>({
  name, form, ...rest
}: SelectFieldProps<T, R>) => {
  const field = useField(name, form);

  return (
    <DropdownField
      instanceId={'select'}

      {...field}
      {...rest}
    />
  )
}
export default DropdownField;
