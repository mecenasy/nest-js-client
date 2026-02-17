import React from 'react';
import * as P from './parts';
import { Grade } from '~/src/store/grade/constants';
import GradeItem from './Grade';

interface GradesRowProps {
  grades: Grade[];
}

const GradesRow = ({ grades }: GradesRowProps) => (
  <P.GradesRow>
    {grades.map((grade: Grade) => (
      <GradeItem key={grade.id} {...grade} />
    ))}
  </P.GradesRow>
);

export default GradesRow;
