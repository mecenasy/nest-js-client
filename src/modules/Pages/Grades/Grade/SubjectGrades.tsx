import React from 'react';
import * as P from './parts';
import GradesRow from './GradesRow';
import { Grade } from '~/src/store/grade/constants';

interface SubjectGradesProps {
  grades: Grade[];
  subject: string;
}

const SubjectGradesItem = ({ grades, subject }: SubjectGradesProps) => (
  <P.SubjectContainer >
    <P.SubjectName>{subject}</P.SubjectName>
    <GradesRow grades={grades} />
  </P.SubjectContainer >
);

export default SubjectGradesItem;
