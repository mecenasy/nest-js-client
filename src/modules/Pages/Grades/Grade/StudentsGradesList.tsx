import React from 'react';
import { StudentGrades } from '~/src/store/grade/constants';
import StudentGradesItem from './StudentGrades';

interface StudentGradesProps {
  students: StudentGrades[],
}

const StudentsGradesList = ({ students }: StudentGradesProps) => (
  <>
    {students.map((student: StudentGrades) => (
      <StudentGradesItem key={student.id} student={student} />
    ))}
  </>
);

export default StudentsGradesList;
