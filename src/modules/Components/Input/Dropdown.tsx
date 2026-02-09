import React from 'react';
import * as P from './parts';
import { DropdownProps, SelectProps } from './types';
import SelectBase from 'react-select';

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
      options={options as any}
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
}: DropdownProps<T>) => (
  <Select
    onChange={onChange}
    value={value}
    options={options}
    className={className}
    name={name ?? ''}
    {...rest}
  />
);

export default DropdownField;
