export interface Item {
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  auditorium: string;
  teacher: Item & { id: string };
  groups: Item[];
  years: Item[];
  specialties: Item[];
}

export interface CreateSubject {
  name: string;
  auditorium: string;
  teacher: string
  groups: string[];
  years: string[];
  specialties: string[];
}

export enum SubjectActionType {
  GetSubjectsRequest = 'subject/GET_SUBJECTS_REQUEST',
  GetSubjectsSuccess = 'subject/GET_SUBJECTS_SUCCESS',
  GetSubjectsFail = 'subject/GET_SUBJECTS_FAIL',

  AddSubjectRequest = 'subject/ADD_SUBJECT_REQUEST',
  AddSubjectSuccess = 'subject/ADD_SUBJECT_SUCCESS',
  AddSubjectFail = 'subject/ADD_SUBJECT_FAIL',

  DeleteSubjectRequest = 'subject/DELETE_SUBJECT_REQUEST',
  DeleteSubjectSuccess = 'subject/DELETE_SUBJECT_SUCCESS',
  DeleteSubjectFail = 'subject/DELETE_SUBJECT_FAIL',

  UpdateSubjectRequest = 'subject/UPDATE_SUBJECT_REQUEST',
  UpdateSubjectSuccess = 'subject/UPDATE_SUBJECT_SUCCESS',
  UpdateSubjectFail = 'subject/UPDATE_SUBJECT_FAIL',
}

export type SubjectAction = {
  type: SubjectActionType.GetSubjectsRequest;
} | {
  type: SubjectActionType.GetSubjectsSuccess;
  subjects: Subject[];
} | {
  type: SubjectActionType.GetSubjectsFail;
  message: string;
} | {
  type: SubjectActionType.AddSubjectRequest;
  subject: CreateSubject[];
  resolve: (value: Subject) => void,
  reject: () => void;
} | {
  type: SubjectActionType.AddSubjectSuccess;
  subject: Subject;
} | {
  type: SubjectActionType.AddSubjectFail;
  message: string;
} | {
  type: SubjectActionType.DeleteSubjectRequest;
  id: string;
} | {
  type: SubjectActionType.DeleteSubjectSuccess;
  id: string;
} | {
  type: SubjectActionType.DeleteSubjectFail;
  message: string;
} | {
  type: SubjectActionType.UpdateSubjectRequest;
  subject: Subject;
} | {
  type: SubjectActionType.UpdateSubjectSuccess;
  subject: Subject;
} | {
  type: SubjectActionType.UpdateSubjectFail;
  message: string;
};

export const initialState: Subject[] = [];
