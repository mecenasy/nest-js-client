import React, { FC } from 'react';
import * as P from '../parts';
import { useField } from 'react-final-form';
import { PersonField } from '~/src/store/person/constants';
import { RoleType } from '~/src/store/role/constants';
import { Button } from '~/src/modules/Components/Buttons/Button';

const StepButton: FC = () => {
  const { input: { value: { label: roleValue } } } = useField(PersonField.Role, { subscription: { value: true } });
  const { input } = useField(PersonField.Step, { type: 'number' });
  if (input.value === 1) {
    return (
      <Button type={'button'} onClick={() => input.onChange(roleValue === RoleType.Student ? 2 : 3)}>Dodaj</Button>
    );
  }
  if (input.value === 2) {
    return (
      <P.ButtonWrapper>
        <Button type={'button'} onClick={() => input.onChange(1)}>Cofnij</Button>
        <Button type={'button'} onClick={() => input.onChange(3)}>Dalej</Button>
      </P.ButtonWrapper>
    );
  }
  return (
    <P.ButtonWrapper>
      <Button type={'button'} onClick={() => input.onChange(roleValue === RoleType.Student ? 2 : 1)}>Cofnij</Button>
      <Button type={'submit'} >Dodaj</Button>
    </P.ButtonWrapper>
  );
}
export default StepButton;
