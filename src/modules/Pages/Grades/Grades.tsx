import React from 'react';
import { Helmet } from 'react-helmet';
import * as P from './parts';
import PageWrapper from '../../Components/Containers/PageWrapper/PageWrapper';
import { RoleType } from '~/src/store/role/constants';
import SubjectGradesList from './Grade/SubjectGradesList';
import TeacherGradesList from './TeacherGradesList';

const Grades = ({ type }: { type: RoleType }) => (
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

export default Grades;
