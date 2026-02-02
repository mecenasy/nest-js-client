import React, { FC } from 'react';
import * as P from './parts';
import PersonDataRow from '../../PersonDataRow/PersonDataRow';

interface PersonBoxProps {
  person: any;
}

const PersonBox: FC<PersonBoxProps> = ({
  person
}) => {
  return (
    <P.BoxUser >
      <P.Photo src={person?.photo || ''} />
      <P.ContentWrapper>
        <div>
          <PersonDataRow title={'Imie Nazwisko'} data={`${person.name} ${person.surname}`} />
          {person.student && (
            <>
              <PersonDataRow title={'Wydział'} data={person.student?.direction || ''} />
              <PersonDataRow title={'Specjalność'} data={person.student?.specialty || ''} />
              <PersonDataRow title={'Numer albumu'} data={person.student?.album?.toString() || ''} />
              <PersonDataRow title={'Rok'} data={person.student?.year || ''} />
              <PersonDataRow title={'Grupa'} data={person.student?.group || ''} />
            </>
          )}
        </div>
        <div>
          <PersonDataRow title={'Adress'} data='' />
          <PersonDataRow title={'Ulica'} data={`${person.address?.street} ${person.address?.number}`} />
          <PersonDataRow title={'Niasto'} data={person.address?.city || ''} />
          <PersonDataRow title={'Państworstwo'} data={person.address?.country || ''} />
          <PersonDataRow title={'Kod pocztowy'} data={person.address?.zipCode || ''} />
        </div>
      </P.ContentWrapper>
    </P.BoxUser>
  )
};

export default PersonBox;
