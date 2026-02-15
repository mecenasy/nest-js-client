import React from 'react';
import { hasWrapperError } from './helpers';
import * as P from './parts';
import { InputProps, InputFormWrapperProps, InputType } from './types'

export const Input = (props: InputProps<HTMLInputElement>) => (
  <P.Input {...props} />
);

export const Textarea = (props: InputProps<HTMLTextAreaElement>) => (
  <P.TextArea {...props} />
);

export const InputFormWrapper = <T extends string | number | boolean | null | undefined | object>({ input, meta, inputType = InputType.all, type = 'text', ...rest }: InputFormWrapperProps<T>) => (
  <>
    {inputType !== InputType.onlyError && (
      <>
        {(input as any)?.type ?? type === 'textarea'
          ? <Textarea {...input} {...rest} />
          : <Input {...input} {...rest} />
        }
      </>
    )}
    {inputType !== InputType.onlyInput && (
      <P.ValidationAlert>
        {hasWrapperError(meta) &&
          <P.Error>{meta.error}</P.Error>
        }
      </P.ValidationAlert>
    )}
  </>
);
export default InputFormWrapper;
