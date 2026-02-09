import { initialState, Subject, SubjectAction, SubjectActionType } from './constants';

export const subjectReducer = (state: Subject[] = initialState, action: SubjectAction): Subject[] => {
  switch (action.type) {
    case SubjectActionType.GetSubjectsSuccess: {
      return action.subjects;
    }
    case SubjectActionType.AddSubjectSuccess: {
      return [...state, action.subject];
    }
    case SubjectActionType.DeleteSubjectSuccess: {
      return state.filter((subject) => subject.id !== action.id);
    }
    case SubjectActionType.UpdateSubjectSuccess: {
      return state.map((subject) =>
        subject.id === action.subject.id ? action.subject : subject
      );
    }
    default: {
      return state;
    }
  }
};
