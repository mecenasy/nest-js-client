import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as P from './parts';
import { GradesContext, GradesField } from '../GradesContext';
import { InputField } from '~/src/modules/Components/Input/InputWithLabel';
import { InputType } from '~/src/modules/Components/Input/types';
import { SubjectContext } from '../SubjectContext';
import { GradeField } from '~/src/store/grade/constants';

interface NewGradeProps {
  studentId: string;
}

const NewGrade = ({ studentId }: NewGradeProps) => {
  const { form, setEdit, isEditing } = useContext(GradesContext);
  const subjectId = useContext(SubjectContext);

  const onClick = useCallback(() => {
    setEdit(studentId)
  }, []);

  const onCustomChange = useCallback((e: ChangeEvent<HTMLInputElement>): GradeField => {
    return {
      studentId,
      subjectId,
      grade: e.target.value,
    }
  }, [subjectId, subjectId]);

  const parseValue = useCallback((props: GradeField) => {
    return props.grade ?? '';
  }, []);


  return (
    <P.NewGradeWrapper>
      {isEditing[studentId] && form ? (
        <InputField<GradesField, GradeField>
          name={`newGrades.${studentId}`}
          autoFocus
          form={form.form}
          type={'text'}
          inputType={InputType.onlyInput}
          onCustomChange={onCustomChange}
          parseValue={parseValue}
        />
      ) : (
        <P.NewGradeButton type={'button'} onClick={onClick}>
          Dodaj ocenę
        </P.NewGradeButton>
      )}
    </P.NewGradeWrapper >
  )
};

export default NewGrade;
