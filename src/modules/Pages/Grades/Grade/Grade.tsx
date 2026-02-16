import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as P from './parts';
import WhiteButton from '~/src/modules/Components/Buttons/IconButton';
import edit from '~/assets/pencil.svg';
import { InputField } from '~/src/modules/Components/Input/InputWithLabel';
import { GradesContext, GradesField } from '../GradesContext';
import { InputType } from '~/src/modules/Components/Input/types';
import { SubjectContext } from '../SubjectContext';
import { GradeField } from '~/src/store/grade/constants';

interface GradeProps {
  id: string;
  studentId: string;
  grade: string;
  date: Date;
}

const GradeItem = ({ id, date, grade, studentId }: GradeProps) => {
  const { form, setEdit, isEditing } = useContext(GradesContext);
  const subjectId = useContext(SubjectContext);
  const onclick = useCallback(() => {
    setEdit(id)
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
    <P.GradeItemWrapper>
      {isEditing[id] && form ? (
        <InputField<GradesField, GradeField>
          name={`editGrades.${id}`}
          autoFocus
          form={form.form}
          type={'text'}
          inputType={InputType.onlyInput}
          onCustomChange={onCustomChange}
          parseValue={parseValue}

        />
      ) : (
        <P.GradeBox>
          <P.Grade>{grade}</P.Grade>
          <P.Date>{new Date(date).toLocaleDateString()}</P.Date>
          {form && (
            <WhiteButton
              type={'button'}
              icon={edit}
              onClick={onclick}
            />)}
        </P.GradeBox>
      )}
    </P.GradeItemWrapper >
  )
};

export default GradeItem;
