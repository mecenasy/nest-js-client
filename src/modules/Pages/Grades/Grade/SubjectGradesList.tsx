import React from 'react';
import SubjectGradesItem from './SubjectGrades';
import { SubjectGrades } from '~/src/store/grade/constants';
import { useSelector } from 'react-redux';
import { getStudentsGradesSelector } from '~/src/store/grade/reducer';



const SubjectGradesList = () => {
  const grades = useSelector(getStudentsGradesSelector);
  return (
    <>
      {grades?.map(({ subject, grades }: SubjectGrades) => (
        <SubjectGradesItem key={subject} subject={subject} grades={grades} />
      ))}
    </>
  )
};

export default SubjectGradesList;
