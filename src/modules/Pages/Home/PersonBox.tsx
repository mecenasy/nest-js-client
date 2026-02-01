import React, { FC } from 'react';
import * as P from './parts';
import PersonDataRow from '../../PersonDataRow/PersonDataRow';
import { useSelector } from 'react-redux';
import { getPerson } from '~/src/store/person/selectors';

const PersonBox: FC = ({

}) => {
  const person = useSelector(getPerson);


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
          <PersonDataRow title={'Wydział'} data={`${person.address?.street} ${person.address?.number}`} />
          <PersonDataRow title={'Specjalność'} data={person.address?.city || ''} />
          <PersonDataRow title={'Numer albumu'} data={person.address?.country || ''} />
          <PersonDataRow title={'Rok'} data={person.address?.zipCode || ''} />
        </div>
      </P.ContentWrapper>
    </P.BoxUser>
  )
};

export default PersonBox;
