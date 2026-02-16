import React, { FC } from 'react';
import * as P from './parts';
import { Grade } from '~/src/store/grade/constants';
import GradeItem from './Grade';

interface GradesRowProps {
  grades: Grade[];
  studentId: string;
}

const GradesRow = ({ grades, studentId }: GradesRowProps) => (
  <P.GradesRow>
    {grades.map((grade: Grade) => (
      <GradeItem key={grade.id} studentId={studentId} {...grade} />
    ))}
  </P.GradesRow>
);

export default GradesRow;
