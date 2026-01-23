import { AddressField, Person, PersonField, PersonFormData } from '~/src/store/person/constants';
import api from '../api';
import { personWithId, person } from './paths';
import { AxiosResponse } from 'axios';

export const getPersonByUserId = async (userId: string) => {
  return await api.get(personWithId(userId));
};

export const addPerson = async (personToAdd: PersonFormData): Promise<AxiosResponse<Person>> => {
  const data: FormData = new FormData();
  data.append(PersonField.Name, personToAdd.name);
  data.append(PersonField.Surname, personToAdd.surname);
  data.append(PersonField.Email, personToAdd.email);
  data.append(PersonField.Phone, personToAdd.phone.toString());
  if (personToAdd.photo) {
    data.append('image', personToAdd.photo, personToAdd.photo.name);
  }
  if (personToAdd.direction) {
    data.append(PersonField.Direction, personToAdd.direction);
  }
  if (personToAdd.specialty) {
    data.append(PersonField.Specialty, personToAdd.specialty);
  }
  if (personToAdd.year) {
    data.append(PersonField.Year, personToAdd.year);
  }
  if (personToAdd.group) {
    data.append(PersonField.Group, personToAdd.group);
  }
  data.append(PersonField.Role, personToAdd.role);

  data.append(`${PersonField.Address}.${AddressField.City}`, personToAdd.address.city);
  data.append(`${PersonField.Address}.${AddressField.Country}`, personToAdd.address.country);
  data.append(`${PersonField.Address}.${AddressField.Number}`, personToAdd.address.number);
  data.append(`${PersonField.Address}.${AddressField.Street}`, personToAdd.address.street);
  data.append(`${PersonField.Address}.${AddressField.ZipCode}`, personToAdd.address.zipCode);

  return api.post(person, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
