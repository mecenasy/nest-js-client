import { DroppedFile } from '~/src/modules/Components/Input/types';

export enum RoleType {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  User = 'user',
}
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
  student?: Student;
};

export interface SimplePerson {
  id: string;
  fullName: string;
  email: string;
  photo: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  number: string;
  zipCode: string;
}

interface Student {
  album: string;
  direction: string;
  specialty: string;
  group: string;
  year: string;
}

export interface PersonResponse {
  userId: string;
  person: Person;
}

export const initialState: Person = {
  id: '',
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
  Person = 'person',
  Student = 'student',
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
  [PersonField.Photo]?: DroppedFile;
  [PersonField.Album]?: number;
  [PersonField.Direction]?: string;
  [PersonField.Specialty]?: string;
  [PersonField.Year]?: string;
  [PersonField.Group]?: string;
  [PersonField.Role]: string;
  [PersonField.Step]: number;
  [PersonField.Address]: AddressFormData;
}
