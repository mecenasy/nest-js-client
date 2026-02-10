import React, { FC } from 'react';
import * as P from './parts';
import PersonDataRow from '../../PersonDataRow/PersonDataRow';
import { Person } from '~/src/store/person/constants';

interface PersonBoxProps {
  person: Person;
  className?: string;
}
const PersonBox: FC<PersonBoxProps> = ({ person, className }) => {
  return (
    <P.BoxUser className={className} >
      <P.Photo src={person?.photo || ''} />
      <P.ContentWrapper>
        <P.NameWrapper>
          <PersonDataRow title={'Imie Nazwisko :'} data={`${person.name} ${person.surname}`} />
        </P.NameWrapper>
        <P.DataWrapper>
          {person.student && (
            <P.DataColumn>
              <PersonDataRow title={'Wydział :'} data={person.student?.direction || ''} />
              <PersonDataRow title={'Specjalność :'} data={person.student?.specialty || ''} />
              <PersonDataRow title={'Numer albumu :'} data={person.student?.album?.toString() || ''} />
              <PersonDataRow title={'Rok :'} data={person.student?.year || ''} />
              <PersonDataRow title={'Grupa :'} data={person.student?.group || ''} />
            </P.DataColumn>
          )}
          {person.address && (
            <P.DataColumn>
              <PersonDataRow title={'Adress'} data='' />
              <PersonDataRow title={'Ulica :'} data={`${person.address.street} ${person.address.number}`} />
              <PersonDataRow title={'Niasto :'} data={person.address.city || ''} />
              <PersonDataRow title={'Państworstwo: '} data={person.address.country || ''} />
              <PersonDataRow title={'Kod pocztowy :'} data={person.address.zipCode || ''} />
            </P.DataColumn>
          )}
        </P.DataWrapper>
      </P.ContentWrapper>
    </P.BoxUser>
  )
};

export default PersonBox;
