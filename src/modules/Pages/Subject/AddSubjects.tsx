import React, { FC } from 'react';
import { Button } from '../../Components/Buttons/Button';
import { FormAdapter } from './AddSubject/SubjectForm';
import { FieldsArray } from './AddSubject/SubjectFields';
import { Subject } from '~/src/store/subject/constants';

interface AddSubjectsProps {
  after: () => void;
  item: Subject | null;
}

const AddSubjects = ({ item, after }: AddSubjectsProps) => (
  <FormAdapter item={item} after={after}>
    {(props) => (
      <>
        <FieldsArray  {...props} />
        {!item && <Button
          type='button'
          onClick={() => {
            props.form.mutators.push('subjects', undefined)
          }}
        >
          dodaj przedmiot
        </Button>}
        <Button type='submit'>Zapisz</Button>
      </>
    )
    }
  </FormAdapter>
);

export default AddSubjects;
