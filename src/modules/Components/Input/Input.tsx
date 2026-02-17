import React, { ChangeEvent, useCallback } from 'react';
import { hasWrapperError } from './helpers';
import * as P from './parts';
import { InputProps, InputFormWrapperProps, InputType } from './types'

export const Input = (props: InputProps<HTMLInputElement>) => (
  <P.Input {...props} />
);

export const Textarea = (props: InputProps<HTMLTextAreaElement>) => (
  <P.TextArea {...props} />
);

export const InputFormWrapper = <T extends string | number | boolean | null | undefined | object, R extends object>({
  input,
  meta,
  inputType = InputType.all,
  type = 'text',
  onCustomChange,
  parseValue,
  ...rest
}: InputFormWrapperProps<T, R>) => {

  const onChange = useCallback((evt: ChangeEvent<any>) => {
    if (onCustomChange) {
      input.onChange(onCustomChange(evt) as any);
    } else {
      input.onChange(evt);
    }
  }, [input, onCustomChange])


  const getValue = useCallback((value: T) => {
    return parseValue ? parseValue(value) : value;
  }, [parseValue]);

  return (
    <>
      {inputType !== InputType.onlyError && (
        <>
          {(input as any)?.type ?? type === 'textarea'
            ? <Textarea {...input} {...rest} />
            : <Input
              {...input}
              {...rest}
              onChange={onChange}
              type={(input as any)?.type ?? type}
              value={getValue(input.value)}
            />
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
  )
};
export default InputFormWrapper;
