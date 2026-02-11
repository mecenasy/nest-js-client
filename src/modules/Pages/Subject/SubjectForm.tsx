import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CreateSubject, SubjectActionType } from '~/src/store/subject/constants';
import { FormRenderProps, useForm } from 'react-final-form-hooks';
import { Option } from '../../Components/Input/types';
import { FormWrapper } from '../../Components/FormWrapper/parts';
import pop from '../../../final-form/pop';
import push from '../../../final-form/push';
import { validateLoginForm } from './helpers';
import { addSubjectRequest } from '~/src/store/subject/actions';

export interface SubjectData {
  name: string;
  auditorium: string;
  years: Option<string>[];
  groups: Option<string>[];
  teachers: Option<string>;
  specialties: Option<string>[];
}

export interface SubjectFormData {
  subjects: SubjectData[];
}

interface SubjectFormProps {
  children: (props: FormRenderProps<SubjectFormData>) => React.ReactNode
}

export const SubjectForm: FC<SubjectFormProps> = ({
  children
}) => {

  const dispatch = useDispatch();

  const onSubmit = useCallback(({ subjects }: SubjectFormData) => {
    const data: CreateSubject[] = subjects.map<CreateSubject>((subject): CreateSubject => {
      return ({
        name: subject.name,
        auditorium: subject.auditorium,
        years: subject.years.map((year) => year.value),
        groups: subject.groups.map((group) => group.value),
        teacher: subject.teachers.value,
        specialties: subject.specialties.map((specialty) => specialty.value)
      });
    });

    return new Promise<SubjectActionType>((resolve, reject) => {
      dispatch(addSubjectRequest(data, resolve, reject),)
    });
  }, [dispatch]);


  const form = useForm<SubjectFormData>({
    onSubmit,
    validate: validateLoginForm,
    mutators: { push, pop },
  });

  return (
    <FormWrapper onSubmit={form.handleSubmit}>
      {children(form)}
    </FormWrapper>
  )
};

