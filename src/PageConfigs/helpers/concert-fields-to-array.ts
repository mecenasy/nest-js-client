import { splitValue } from './split-by-comma';

export const convertFieldsToArray = (object: Record<string, any>, ignoreFields: string[]) => {
  const keys = Object.keys(object);
  keys.forEach((key) => {
    if (ignoreFields.includes(key)) {
      return;
    }
    if (typeof object[key] === 'string') {
      object[key] = splitValue(object[key]);
    }
  });
  return object;
}