import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as P from './parts';
import WhiteButton from '~/src/modules/Components/Buttons/IconButton';
import edit from '~/assets/pencil.svg';
import { InputField } from '~/src/modules/Components/Input/InputWithLabel';
import { GradesContext, GradesField } from '../GradesContext';
import { InputType } from '~/src/modules/Components/Input/types';
import { UpdatedGradeField } from '~/src/store/grade/constants';

interface GradeProps {
  id: string;
  grade: string;
  date: Date;
}

const GradeItem = ({ id, date, grade }: GradeProps) => {
  const { form, setEdit, isEditing } = useContext(GradesContext);
  const onclick = useCallback(() => {
    setEdit(id)
  }, []);

  const onCustomChange = useCallback((e: ChangeEvent<HTMLInputElement>): UpdatedGradeField => {
    return {
      id,
      grade: e.target.value,
    }
  }, [id]);

  const parseValue = useCallback((props: UpdatedGradeField) => {

    return props.grade ?? '';
  }, []);

  return (
    <P.GradeItemWrapper>
      {isEditing[id] && form ? (
        <InputField<GradesField, UpdatedGradeField>
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
