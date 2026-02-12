import React, { useEffect } from 'react';
import * as P from './parts';
import { FormConfig, FormRenderProps, useForm } from 'react-final-form-hooks';
import push from '~/src/final-form/push';
import pop from '~/src/final-form/pop';

interface SubjectFormProps<T> extends FormConfig<T> {
  children: (props: FormRenderProps<T>) => React.ReactNode;
  autoPushArray?: boolean;

}
export const FormAdapter = <T extends object>({ children, autoPushArray, ...rest }: SubjectFormProps<T>) => {
  const form = useForm<T>({
    ...rest,
    mutators: { ...rest.mutators, push, pop }
  });

  useEffect(() => {
    if (autoPushArray) {
      form.form.mutators.push('subjects', undefined);
    }
  }, [autoPushArray, form.form.mutators])

  return (
    <P.FormWrapper onSubmit={form.handleSubmit}>
      {children(form)}
    </P.FormWrapper>
  )
};

export default FormAdapter;
