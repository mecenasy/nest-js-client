import React, { FC } from "react";
import ActionsWrapper from "./Actions/ActionsWrapper";
import UserList from '../modules/Pages/UserList/UserList';
import { actionCreator } from '../PageConfigs/userListConfig';

const UserListPage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <UserList />
  </ActionsWrapper>
);

export default UserListPage