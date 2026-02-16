import React, { FC } from 'react';
import * as P from './parts';
import Header from './Header';

interface SectionHeaderProps {
  year: string;
  group: string;
  name: string;
  hideHeader: boolean;
}

const SectionHeader = ({ group, hideHeader, name, year }: SectionHeaderProps) => (
  <P.HeaderWrapper>
    {!hideHeader && (
      <Header year={year} group={group} />
    )}
    {name && <P.Subject>{name}</P.Subject>}
  </P.HeaderWrapper>
);

export default SectionHeader;
