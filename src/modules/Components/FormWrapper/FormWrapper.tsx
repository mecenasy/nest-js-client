import React from 'react';
import { UnknownAction } from 'redux';
import { Form, FormProps, FormRenderProps } from 'react-final-form';
import MakeAsyncFunction from './MakeAsyncFunction';
import { promiseListener } from '~/src/store/configuration/reduxPromiseListener';
import { handleAsyncFormSubmit } from '~/utils/handleSubmitForm';
import { Config } from 'final-form';
import * as P from './parts';

export type SetPayload<A = UnknownAction, T = Record<string, any>> = (action: A, formData: T) => A
export type GetError<A = UnknownAction> = (action: A) => void
export type GetPayload<A = UnknownAction> = (action: A) => Record<string, string> | undefined

interface FormWrapperProps<A, T> extends Omit<FormProps, 'onSubmit'> {
  className?: string;
  start: string;
  resolve: string;
  reject: string;
  setPayload?: SetPayload<A, T>;
  getPayload?: GetPayload<A>;
  getError?: GetError<A>;
  children: (props: Omit<FormRenderProps, 'handleSubmit'>) => React.ReactNode
}

type FormWrapperType = <Action = UnknownAction, FormValues = Record<string, any>>(
  props: FormWrapperProps<Action, FormValues>
) => React.ReactElement;

const FormWrapper: FormWrapperType = ({
  className,
  start,
  resolve,
  reject,
  setPayload,
  getPayload,
  getError,
  children,
  ...rest
}) => (
  <MakeAsyncFunction
    listener={promiseListener}
    start={start}
    resolve={resolve}
    reject={reject}
    setPayload={setPayload}
    getPayload={getPayload}
    getError={getError}
  >
    {(handleSubmit: Config['onSubmit']) => (
      <Form
        {...rest}
        onSubmit={handleAsyncFormSubmit(handleSubmit)}
      >
        {({ handleSubmit, ...rest }) => (
          <P.FormWrapper className={className} onSubmit={handleSubmit}>
            {children(rest)}
          </P.FormWrapper>
        )}
      </Form>
    )}
  </MakeAsyncFunction>
);

export default FormWrapper;
