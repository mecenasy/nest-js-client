import { useMemo } from 'react';
import { useField } from 'react-final-form-hooks';
import { FormApi } from 'final-form';
import { FieldArrayRenderProps } from './types';
import copyPropertyDescriptors from './copyPropertyDescriptors';

const useFieldArray = <T>(name: string, form: FormApi<T>): FieldArrayRenderProps => {
  const formMutators = form.mutators;
  const hasMutators = !!(formMutators && (formMutators as any).push && (formMutators as any).pop);
  if (!hasMutators) {
    throw new Error(
      'Array mutators not found. You need to provide the mutators from final-form-arrays to your form',
    );
  }
  const mutators = useMemo<Record<string, any>>(
    () =>
      // curry the field name onto all mutator calls
      Object.keys(formMutators).reduce(
        (result, key) => {
          result[key] = (...args: any[]) => (formMutators as any)[key](name, ...args);
          return result;
        },
        {} as Record<string, any>,
      ),
    [name, formMutators],
  );

  const fieldState = useField(name, form);

  // FIX #167: Don't destructure/spread meta object because it has lazy getters
  // Extract length directly from meta when needed
  const { meta, input } = fieldState;
  const length = meta.length;

  // Create a new meta object that excludes length, preserving lazy getters
  const metaWithoutLength = copyPropertyDescriptors(meta, {} as any, ['length']);

  const forEach = (iterator: (name: string, index: number) => void): void => {
    // required || for Flow, but results in uncovered line in Jest/Istanbul
    // istanbul ignore next
    const len = length || 0;
    for (let i = 0; i < len; i++) {
      iterator(`${name}[${i}]`, i);
    }
  };

  const map = <T>(iterator: (name: string, index: number) => T): T[] => {
    // required || for Flow, but results in uncovered line in Jest/Istanbul
    // istanbul ignore next
    const len = length || 0;
    const results: T[] = [];
    for (let i = 0; i < len; i++) {
      results.push(iterator(`${name}[${i}]`, i));
    }
    return results;
  };

  // Don't spread fieldState, extract only what we need
  if ((fieldState as any).meta) {
    delete (fieldState as any).meta;
  }
  if ((fieldState as any).input) {
    delete (fieldState as any).input;
  }

  return {
    fields: {
      name,
      forEach,
      length: length || 0,
      map,
      ...(mutators as any),
      ...fieldState,
      value: input.value,
    } as any,
    meta: metaWithoutLength,
  };
};

export default useFieldArray;
