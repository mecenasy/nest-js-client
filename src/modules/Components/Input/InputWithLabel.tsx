import React from 'react';
import { InputFormWrapper } from './Input';
import { InputFormWrapperProps } from './types';
import * as P from './parts';

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
