export interface University {
  directions: Direction[];
  specialties: Specialty[];
  group: Group[];
  years: Year[];
  roles: string[];
}

export interface Direction {
  name: string;
  specialties: string[];
  years: string[];
}

export interface Specialty {
  name: string;
  direction: string;
  groups: string[];
  years: string[];
}

export interface Group {
  name: string;
  specialty: string;
  years: string[];
}

export interface Year {
  name: string;
  directions: string[];
  specialties: string[];
  groups: string[];
}

export interface UniversityState {
  directions: Direction[];
  specialties: Specialty[];
  years: Year[];
  group: Group[];
}

export enum UniversityActionType {
  GetUniversityRequest = 'university/GET_UNIVERSITY_REQUEST',
  GetUniversitySuccess = 'university/GET_UNIVERSITY_SUCCESS',
  GetUniversityFail = 'university/GET_UNIVERSITY_FAIL',
}

export type UniversityAction = {
  type: UniversityActionType.GetUniversityRequest;
} | {
  type: UniversityActionType.GetUniversitySuccess;
  data: any;
} | {
  type: UniversityActionType.GetUniversityFail;
  message: string,
};

export const initialState: UniversityState = {
  directions: [],
  specialties: [],
  years: [],
  group: []
}