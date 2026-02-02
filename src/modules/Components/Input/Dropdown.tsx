import React from 'react';
import * as P from './parts';
import { DropdownProps, SelectProps } from './types';
import Select from 'react-select';

export const SelectComponent = <T extends any>({ onChange, value, label, className, options, ...rest }: SelectProps<T>) => (
  <P.DropdownWrapper className={className}>
    <P.Label>{label}</P.Label>
    <Select
      onChange={onChange}
      value={value}
      options={options as any}
      styles={{ control: (prov) => ({ ...prov, border: '1px solid black', borderRadius: '8px' }) }}
      {...rest}
    />
  </P.DropdownWrapper>
);

const Dropdown = <T extends any>({ input: { onChange, value }, label, options, className, ...rest }: DropdownProps<T>) => (
  <P.DropdownWrapper className={className}>
    <P.Label>{label}</P.Label>
    <Select
      onChange={onChange}
      value={value}
      options={options}
      styles={{ control: (prov) => ({ ...prov, border: '1px solid black', borderRadius: '8px' }) }}
      {...rest}
    />
  </P.DropdownWrapper>
);

export default Dropdown;
