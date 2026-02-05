import { Config } from 'final-form';

export const handleAsyncFormSubmit = <T>(asyncSubmit: Config<T, T>['onSubmit']): Config<T, T>['onSubmit'] => async (values, form, callback) => {
  try {
    return await asyncSubmit(values, form);
  } catch (error: any) {
    callback?.(error);
  }
};
