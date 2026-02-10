import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { getUserList, } from '~/src/store/userList/selectors';
import Filters from './Filters/filters';
import Pagination from './Pagination/Pagination';

const UserList: FC = () => {
  const users = useSelector(getUserList);

  return (
    <PageWrapper>
      <Helmet>
        <title>Lista użytkowników</title>
      </Helmet>
      <P.Wrapper>
        <Filters />
        <P.RightColumn>
          <P.ListWrapper>
            {users?.map((user: any, index: number) => (
              <P.PersonBox key={user.id || index} person={user} />
            ))}
          </P.ListWrapper>
          <Pagination />
        </P.RightColumn>
      </P.Wrapper>
    </PageWrapper>
  );
};

export default UserList;