import { RoleType } from "../role/constants";

export enum Direction {
  Informatics = 'Informatyka',
  Management = 'Zarządzanie',
  None = '',
}

export enum Specialty {
  Programming = 'Programowanie',
  Networks = 'Sieci',
  None = '',
}


export type Person = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: number;
  photo?: string;
  address?: Address;
} & ({
  album: number;
  direction: string;
  specialty: string;
  year: string;
  group: string;
  role: RoleType.Student;
} | {
  role: RoleType.Teacher | RoleType.Admin;
});

export interface Address {
  street: string;
  city: string;
  country: string;
  number: string;
  zipCode: string;
}

export enum PersonActionType {
  GetPersonRequest = 'person/GET_PERSON_REQUEST',
  GetPersonSuccess = 'person/GET_PERSON_SUCCESS',
  GetPersonFail = 'person/GET_PERSON_FAIL',
  AddPersonRequest = 'person/ADD_PERSON_REQUEST',
  AddPersonSuccess = 'person/ADD_PERSON_SUCCESS',
  AddPersonFail = 'person/ADD_PERSON_FAIL',
}

export type PersonAction = {
  type: PersonActionType.GetPersonRequest;
} | {
  userId: string;
  type: PersonActionType.GetPersonSuccess;
  person: Person;
} | {
  userId: string;
  type: PersonActionType.GetPersonFail;
  message: string,
} | {
  type: PersonActionType.AddPersonRequest;
  person: PersonFormData;
} | {
  type: PersonActionType.AddPersonSuccess;
  person: Person;
} | {
  type: PersonActionType.AddPersonFail;
  message: string,
};

export const initialState: Person = {
  id: '',
  album: 0,
  role: RoleType.Student,
  direction: Direction.None,
  specialty: Specialty.None,
  year: '',
  group: '',
  name: '',
  surname: '',
  phone: 0,
  email: '',
  photo: '',
};
export enum PersonField {
  Id = 'id',
  Name = 'name',
  Surname = 'surname',
  Email = 'email',
  Phone = 'phone',
  Photo = 'photo',
  Album = 'album',
  Direction = 'direction',
  Specialty = 'specialty',
  Year = 'year',
  Group = 'group',
  Role = 'role',
  Address = 'address',
  Step = 'stap',
}

export enum AddressField {
  Street = 'street',
  City = 'city',
  Country = 'country',
  Number = 'number',
  ZipCode = 'zipCode',
}

export interface AddressFormData {
  [AddressField.Street]: string;
  [AddressField.City]: string;
  [AddressField.Country]: string;
  [AddressField.Number]: string;
  [AddressField.ZipCode]: string;
}
export interface PersonFormData {
  [PersonField.Name]: string;
  [PersonField.Surname]: string;
  [PersonField.Email]: string;
  [PersonField.Phone]: number;
  [PersonField.Photo]?: File;
  [PersonField.Album]?: number;
  [PersonField.Direction]?: string;
  [PersonField.Specialty]?: string;
  [PersonField.Year]?: string;
  [PersonField.Group]?: string;
  [PersonField.Role]: string;
  [PersonField.Step]: string;
  [PersonField.Address]: AddressFormData;
}
