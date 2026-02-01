import { UniversityAction, UniversityActionType, UniversityState } from "./constants";

export const getStudentRequest = (): UniversityAction => ({
  type: UniversityActionType.GetUniversityRequest,
});

export const getStudentSuccess = (data: UniversityState): UniversityAction => ({
  data,
  type: UniversityActionType.GetUniversitySuccess,
});

export const getStudentFail = (message: string): UniversityAction => ({
  message,
  type: UniversityActionType.GetUniversityFail,
});
