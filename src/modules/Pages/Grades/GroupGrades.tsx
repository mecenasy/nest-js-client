import React from 'react';
import * as P from './parts';
import GradesProvider from './GradesContext';
import { TeacherGrades } from '~/src/store/grade/constants';
import SectionHeader from './SectionHeader/SectionHeader';
import StudentsGradesList from './Grade/StudentsGradesList';
import SubjectProvider from './SubjectContext';

interface GroupGradesProps extends TeacherGrades {
  hide: boolean
}

const GroupGrades = ({ group, subjects, year, hide }: GroupGradesProps) => (
  <GradesProvider>
    <P.TeacherSection $hide={hide}>
      {subjects.map(({ id, name, students }, index) => (
        <P.InnerWrapper key={id}>
          <SectionHeader
            year={year}
            group={group}
            name={name}
            hideHeader={Boolean(index)}
          />
          <SubjectProvider subjectId={id}>
            <StudentsGradesList students={students} />
          </SubjectProvider>
        </P.InnerWrapper>
      ))}

      <P.ConfirmButton type={'submit'}>Zatwierdź oceny</P.ConfirmButton>
    </P.TeacherSection>
  </GradesProvider>
);

export default GroupGrades;
