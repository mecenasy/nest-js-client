import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { CreateSubject, Subject, SubjectActionType } from '~/src/store/subject/constants';
import { FormRenderProps } from 'react-final-form-hooks';
import { Option } from '../../../Components/Input/types';
import { validateLoginForm } from '../helpers';
import { addSubjectRequest } from '~/src/store/subject/actions';
import FormAdapter from '~/src/modules/Components/FormWrapper/Formadapter';

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
  children: (props: FormRenderProps<SubjectFormData>) => React.ReactNode;
  item: Subject | null;
  after: () => void;
}

export const SubjectForm = ({ children, item, after }: SubjectFormProps) => {
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
      dispatch(addSubjectRequest(data, resolve, reject));
      after();
    });
  }, [dispatch]);

  const initialValues: SubjectFormData | undefined = useMemo(() => {
    if (item) {
      return ({
        subjects: [{
          name: item?.name ?? '',
          auditorium: item?.auditorium ?? '',
          years: item?.years.map((year) => ({ value: year.name, label: year.name })) ?? [],
          groups: item?.groups.map((group) => ({ value: group.name, label: group.name })) ?? [],
          teachers: { value: item?.teacher.id ?? '', label: item?.teacher.name ?? '' },
          specialties: item?.specialties.map((specialty) => ({ value: specialty.name, label: specialty.name })) ?? []
        }]
      });
    }
  }, [item]);


  return (
    <FormAdapter<SubjectFormData>
      autoPushArray={!!initialValues}
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validateLoginForm}
    >
      {(form) => (children(form))}
    </FormAdapter>
  )
};

