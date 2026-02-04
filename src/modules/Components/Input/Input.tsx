import React, { FC } from 'react';
import { hasWrapperError } from './helpers';
import * as P from './parts';
import { InputProps, InputFormWrapperProps, InputType } from './types'

export const Input: FC<InputProps> = (props) => (
  <P.Input {...props} />
);

export const Textarea: FC<InputProps> = (props) => (
  <P.TextArea {...props} />
);

export const InputFormWrapper = <T extends any>({ input, meta, inputType = InputType.all, ...rest }: InputFormWrapperProps<T>) => (
  <>
    {inputType !== InputType.onlyError && (
      <>
        {input.type === 'textarea'
          ? <Textarea {...input} {...rest} />
          : <Input {...input} {...rest} />
        }
      </>
    )}
    {inputType !== InputType.onlyInput && (
      <P.ValidationAlert>
        {hasWrapperError<T>(meta) &&
          <P.Error>{meta.error}</P.Error>
        }
      </P.ValidationAlert>
    )}
  </>
);
export default InputFormWrapper;
