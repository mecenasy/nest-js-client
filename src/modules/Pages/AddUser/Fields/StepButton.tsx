import React from 'react';
import * as P from '../parts';
import { useField } from 'react-final-form-hooks';
import { PersonField, PersonFormData, RoleType } from '~/src/store/person/constants';
import { Button } from '~/src/modules/Components/Buttons/Button';
import { FormApi } from 'final-form';

const StepButton = ({ form }: { form: FormApi<PersonFormData> }) => {
  const { input: { value: { value } } } = useField(PersonField.Role, form);
  const { input } = useField(PersonField.Step, form);
  if (input.value === 1) {
    return (
      <Button type={'button'} onClick={() => input.onChange(value === RoleType.Student ? 2 : 3)}>Dodaj</Button>
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
      <Button type={'button'} onClick={() => input.onChange(value === RoleType.Student ? 2 : 1)}>Cofnij</Button>
      <Button type={'submit'} >Dodaj</Button>
    </P.ButtonWrapper>
  );
}
export default StepButton;
