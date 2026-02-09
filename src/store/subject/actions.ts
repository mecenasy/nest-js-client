import { Subject, SubjectAction, SubjectActionType } from './constants';

export const getSubjectsRequest = (): SubjectAction => ({
  type: SubjectActionType.GetSubjectsRequest,
});

export const getSubjectsSuccess = (subjects: Subject[]): SubjectAction => ({
  type: SubjectActionType.GetSubjectsSuccess,
  subjects,
});

export const getSubjectsFail = (message: string): SubjectAction => ({
  type: SubjectActionType.GetSubjectsFail,
  message,
});

export const addSubjectRequest = (subject: Subject): SubjectAction => ({
  type: SubjectActionType.AddSubjectRequest,
  subject,
});

export const addSubjectSuccess = (subject: Subject): SubjectAction => ({
  type: SubjectActionType.AddSubjectSuccess,
  subject,
});

export const addSubjectFail = (message: string): SubjectAction => ({
  type: SubjectActionType.AddSubjectFail,
  message,
});

export const deleteSubjectRequest = (id: string): SubjectAction => ({
  type: SubjectActionType.DeleteSubjectRequest,
  id,
});

export const deleteSubjectSuccess = (id: string): SubjectAction => ({
  type: SubjectActionType.DeleteSubjectSuccess,
  id,
});

export const deleteSubjectFail = (message: string): SubjectAction => ({
  type: SubjectActionType.DeleteSubjectFail,
  message,
});

export const updateSubjectRequest = (subject: Subject): SubjectAction => ({
  type: SubjectActionType.UpdateSubjectRequest,
  subject,
});

export const updateSubjectSuccess = (subject: Subject): SubjectAction => ({
  type: SubjectActionType.UpdateSubjectSuccess,
  subject,
});

export const updateSubjectFail = (message: string): SubjectAction => ({
  type: SubjectActionType.UpdateSubjectFail,
  message,
});
