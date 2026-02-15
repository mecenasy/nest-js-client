import React from 'react';
import { Button } from '../../Components/Buttons/Button';
import { SubjectForm } from './AddSubject/SubjectForm';
import { FieldsArray } from './AddSubject/SubjectFields';
import { Subject } from '~/src/store/subject/constants';

interface AddSubjectsProps {
  after: () => void;
  item: Subject | null;
}

const AddSubjects = ({ item, after }: AddSubjectsProps) => (
  <SubjectForm item={item} after={after}>
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
    )}
  </SubjectForm>
);

export default AddSubjects;
