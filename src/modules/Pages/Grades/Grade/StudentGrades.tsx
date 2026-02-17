import React from 'react';
import * as P from './parts';
import { StudentGrades } from '~/src/store/grade/constants';
import GradesRow from './GradesRow';
import NewGrade from './NewGrade';

interface StudentGradesProps {
  student: StudentGrades,
}

const StudentGradesItem = ({ student }: StudentGradesProps) => (
  <P.StudentContainer key={student.id}>
    <P.StudentName>{student.name}</P.StudentName>
    <P.GradesFlexRow>
      <GradesRow grades={student.grades} />
      <NewGrade studentId={student.id}
      />
    </P.GradesFlexRow>
  </P.StudentContainer>
);

export default StudentGradesItem;
