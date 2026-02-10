import React, { FC } from 'react';
import { TitleRow, TitleData } from './parts';

interface PersonDataRowProps {
  title: string;
  data: string;
}

const PersonDataRow: FC<PersonDataRowProps> = ({
  data,
  title,
}) => (
  <>
    <TitleRow>{title}</TitleRow>
    <TitleData>{data}</TitleData>
  </>
);

export default PersonDataRow;
