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
  roles: string[];
}

export const initialState: UniversityState = {
  directions: [],
  specialties: [],
  years: [],
  group: [],
  roles: [],
};
