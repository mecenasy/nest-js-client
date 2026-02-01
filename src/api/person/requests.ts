import { AddressField, Person, PersonField, PersonFormData } from '~/src/store/person/constants';
import api from '../api';
import { person, registerPerson } from './paths';
import { AxiosResponse } from 'axios';

export const getPersonByUserId = async () => {
  return await api.get(person);
};

export const addPerson = async (personToAdd: PersonFormData): Promise<AxiosResponse<Person>> => {
  const data: FormData = new FormData();

  data.append(PersonField.Email, personToAdd.email);
  data.append(PersonField.Role, personToAdd.role);

  data.append(`${PersonField.Person}.${PersonField.Name}`, personToAdd.name);
  data.append(`${PersonField.Person}.${PersonField.Surname}`, personToAdd.surname);
  data.append(`${PersonField.Person}.${PersonField.Phone}`, personToAdd.phone.toString());

  if (personToAdd.photo) {
    data.append('image', personToAdd.photo, personToAdd.photo.name);
  }
  if (personToAdd.direction) {
    data.append(`${PersonField.Student}.${PersonField.Direction}`, personToAdd.direction);
  }
  if (personToAdd.specialty) {
    data.append(`${PersonField.Student}.${PersonField.Specialty}`, personToAdd.specialty);
  }
  if (personToAdd.year) {
    data.append(`${PersonField.Student}.${PersonField.Year}`, personToAdd.year);
  }
  if (personToAdd.group) {
    data.append(`${PersonField.Student}.${PersonField.Group}`, personToAdd.group);
  }

  data.append(`${PersonField.Address}.${AddressField.City}`, personToAdd.address.city);
  data.append(`${PersonField.Address}.${AddressField.Country}`, personToAdd.address.country);
  data.append(`${PersonField.Address}.${AddressField.Number}`, personToAdd.address.number);
  data.append(`${PersonField.Address}.${AddressField.Street}`, personToAdd.address.street);
  data.append(`${PersonField.Address}.${AddressField.ZipCode}`, personToAdd.address.zipCode);

  return api.post(registerPerson, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
