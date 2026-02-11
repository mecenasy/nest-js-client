import React, { FC } from 'react';
import { Button } from '../../Components/Buttons/Button';
import { SubjectForm } from './SubjectForm';
import { FieldsArray } from './SubjectFields';

const AddSubjects = () => (
  <SubjectForm>
    {(props) => (
      <>
        <FieldsArray  {...props} />
        <Button type='button' onClick={() => {
          props.form.mutators.push('subjects', undefined)
        }}   >dodaj przedmiot</Button>
        <Button type='submit'>Zapisz</Button>
      </>
    )
    }
  </SubjectForm>
);

export default AddSubjects;
