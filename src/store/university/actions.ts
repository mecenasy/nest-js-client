import { UniversityAction, UniversityActionType, UniversityState } from "./constants";

export const getUniversityRequest = (): UniversityAction => ({
  type: UniversityActionType.GetUniversityRequest,
});

export const getUniversitySuccess = (data: UniversityState): UniversityAction => ({
  data,
  type: UniversityActionType.GetUniversitySuccess,
});

export const getUniversityFail = (message: string): UniversityAction => ({
  message,
  type: UniversityActionType.GetUniversityFail,
});
