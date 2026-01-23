import React from 'react';
import * as P from './parts';
import { DropdownProps } from './types';
import Select from 'react-select';

const Dropdown = <T extends any>({ input: { onChange, value }, label, className, ...rest }: DropdownProps<T>) => (
  <P.DropdownWrapper className={className}>
    <P.Label>{label}</P.Label>
    <Select
      onChange={onChange}
      value={value}
      styles={{ control: (prov) => ({ ...prov, border: '1px solid black', borderRadius: '8px' }) }}
      {...rest}
    />
  </P.DropdownWrapper>
);

export default Dropdown;
