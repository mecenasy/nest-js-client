import { StudentAction, StudentActionType } from "./constants";

export const getStudentRequest = (): StudentAction => ({
  type: StudentActionType.GetStudentRequest,
});

export const getStudentSuccess = (data: any): StudentAction => ({
  data,
  type: StudentActionType.GetStudentSuccess,
});

export const getStudentFail = (message: string): StudentAction => ({
  message,
  type: StudentActionType.GetStudentFail,
});
