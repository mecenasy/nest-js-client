import React, { ChangeEvent } from 'react';
import * as P from './parts';
import plus from '~/assets/plus.svg';

interface ControlSubjectProps {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  add: () => void;
  search: string;

}

const ControlSubject = ({ onChange, add, search }: ControlSubjectProps) => (
  <P.ControlWrapper>
    <P.Title>Przedmioty</P.Title>
    <P.Search>
      <P.SubTitle>Wyszukaj przedmioty:</P.SubTitle>
      <P.SearchInput
        onChange={onChange}
        value={search}
        placeholder={'Nazwa przedmiotu'}
        type='text'
      />
    </P.Search>
    <P.AddButton
      title="Dodaj nowy Przedmiot"
      onClick={add}
      icon={plus}
    />
  </P.ControlWrapper>
);

export default ControlSubject;
