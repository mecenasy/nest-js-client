
export interface Direction {
  _id: string;
  specialtyIds: string[];
  direction: string;
}
export interface Specialty {
  _id: string;
  yearIds: string[];
  specialty: string;
  directionId: string;
}
export interface Year {
  _id: string;
  specialtyIds: string[];
  directionIds: string[];
  groupIds: string[];
  year: number;
}
export interface Group {
  _id: string;
  specialtyId: string;
  yearIds: string[];
  name: string;
}


export interface StudentDataState {
  direction: Direction[];
  specialty: Specialty[];
  year: Year[];
  group: Group[];
}

export enum StudentActionType {
  GetStudentRequest = 'student/GET_STUDENT_REQUEST',
  GetStudentSuccess = 'student/GET_STUDENT_SUCCESS',
  GetStudentFail = 'student/GET_STUDENT_FAIL',
}

export type StudentAction = {
  type: StudentActionType.GetStudentRequest;
} | {
  type: StudentActionType.GetStudentSuccess;
  data: any;
} | {
  type: StudentActionType.GetStudentFail;
  message: string,
};

export const initialState: StudentDataState = {
  direction: [],
  specialty: [],
  year: [],
  group: []
}