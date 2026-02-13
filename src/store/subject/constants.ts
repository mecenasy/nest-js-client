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

export const initialState: Subject[] = [];
