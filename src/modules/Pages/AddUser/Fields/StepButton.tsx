import React, { FC } from 'react';
import * as P from '../parts';
import { useField } from 'react-final-form';
import { PersonField } from '~/src/store/person/constants';
import { RoleType } from '~/src/store/role/constants';

const StepButton: FC = () => {
  const { input: { value: { label: roleValue } } } = useField(PersonField.Role, { subscription: { value: true } });
  const { input } = useField(PersonField.Step, { type: 'number' });
  if (input.value === 1) {
    return (
      <P.Button type={'button'} onClick={() => input.onChange(roleValue.toLowerCase() === RoleType.Student ? 2 : 3)}>Dodaj</P.Button>
    );
  }
  if (input.value === 2) {
    return (
      <P.ButtonWrapper>
        <P.Button type={'button'} onClick={() => input.onChange(1)}>Cofnij</P.Button>
        <P.Button type={'button'} onClick={() => input.onChange(3)}>Dalej</P.Button>
      </P.ButtonWrapper>
    );
  }
  return (
    <P.ButtonWrapper>
      <P.Button type={'button'} onClick={() => input.onChange(roleValue.toLowerCase() === RoleType.Student ? 2 : 1)}>Cofnij</P.Button>
      <P.Button type={'submit'} >Dodaj</P.Button>
    </P.ButtonWrapper>
  );
}
export default StepButton;
