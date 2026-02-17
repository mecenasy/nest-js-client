import React from 'react';
import * as P from './parts';

interface HeaderProps {
  year: string;
  group: string;
}

const Header = ({ group, year }: HeaderProps) => (
  <P.SectionHeader>
    <P.SubTitle>Rok: </P.SubTitle>
    <P.Title>{year}</P.Title>
    <P.SubTitle> Grupa: </P.SubTitle>
    <P.Title>{group}</P.Title>
  </P.SectionHeader>
);

export default Header;
