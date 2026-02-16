import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as P from './parts';
import PageWrapper from '../../Components/Containers/PageWrapper/PageWrapper';
import { RoleType } from '~/src/store/role/constants';
import { getTeacherGradesSelector } from '~/src/store/grade/reducer';
import SubjectGradesList from './Grade/SubjectGradesList';
import TeacherGradesList from './TeacherGradesList';

const Grades = ({ type }: { type: RoleType }) => {
  const dispatch = useDispatch();
  const grades = useSelector(getTeacherGradesSelector);
  return (
    <PageWrapper >
      <Helmet>
        <title>Oceny</title>
        <meta name="description" content={'oceny studenta prezentujący możiwości aplikacji'} />
      </Helmet>
      <P.Wrapper>
        <P.Header>Oceny</P.Header>
        {type === RoleType.Student && (
          <P.ListWrapper>
            <SubjectGradesList />
          </P.ListWrapper>
        )}
        {type === RoleType.Teacher && (
          <P.ListWrapper>
            <TeacherGradesList />
          </P.ListWrapper>
        )}

      </P.Wrapper>
    </PageWrapper>
  )
};

export default Grades;
