import { Group, Specialty, Year } from '~/src/store/university/constants';
import { Option } from '../../Components/Input/types';
import { SimplePerson } from '~/src/store/person/constants';
import { SubjectFormData } from './SubjectForm';

export const validateLoginForm = (values: SubjectFormData) => {
  const error: Partial<Record<keyof SubjectFormData, Array<Partial<Record<keyof SubjectFormData['subjects'][0], string>>>>> = {};

  if (!values.subjects || values.subjects.length === 0) {
    error.subjects = [{
      auditorium: 'musisz wpisać audytorium',
      name: 'musisz wpisać nazwę przedmiotu',
      groups: 'musisz wybrć przynamniej jedną grupę',
      teachers: 'musisz wybrć przynamniej jednego nauczyciela',
      years: 'musisz wybrć przynamniej jeden rok',
      specialties: 'musisz wybrć przynamniej jedną specjalność',
    }]
  }

  if (values.subjects?.length > 0) {
    const er: Array<Partial<Record<keyof SubjectFormData['subjects'][0], string>>> = [];

    values.subjects.forEach((item, index) => {
      const err: Partial<Record<keyof SubjectFormData['subjects'][0], string>> = {}
      if (!item?.name) {
        err.name = 'musisz wpisać nazwę przedmiotu'
      }
      if (!item?.auditorium) {
        err.auditorium = 'musisz wpisać audytorium'
      }
      if (!item?.groups || item.groups.length === 0) {
        err.groups = 'musisz wybrć przynamniej jedną grupę'
      }
      if (!item?.teachers) {
        err.teachers = 'musisz wybrć przynamniej jednego nauczyciela'
      }
      if (!item?.years || item.years.length === 0) {
        err.years = 'musisz wybrć przynamniej jeden rok'
      }
      if (Object.keys(err).length > 0) {
        er[index] = err;
      }
    });


    if (er.length > 0) {
      error.subjects = er;
    }
  }
  return error;
};


export const getOption = (data: Year[] | Specialty[] | Group[]): Option<string>[] => {
  return data?.map((item: Year | Specialty | Group) => ({
    label: item.name,
    value: item.name,
  }));
};

export const getTeacherOption = (data: SimplePerson[]): Option<string>[] => {
  return data?.map((item: SimplePerson) => ({
    label: item.fullName,
    value: item.id,
  }));
};