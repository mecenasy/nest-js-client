import React, { FC } from 'react';
import * as P from './parts';

interface SubjectRowProps {
  title: string;
  value: string;
}

const SubjectRow = ({ title, value, }: SubjectRowProps) => (
  <P.SubjectRow>
    <P.SubjectTitle>{title}: </P.SubjectTitle>
    <span>{value}</span>
  </P.SubjectRow>
);

export default SubjectRow;
