// Copy from MDN: https://github.com/final-form/final-form-arrays

import { MutableState, Mutator, Tools } from 'final-form';

const push: Mutator<any> = (
  [name, value]: any[],
  state: MutableState<any>,
  { changeValue }: Tools<any>,
): void => {
  changeValue(state, name, (array?: any[]): any[] => {
    return array ? [...array, value] : [value];
  });
};

export default push;
