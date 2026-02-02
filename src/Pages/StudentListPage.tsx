import React, { FC } from "react";
import ActionsWrapper from "./Actions/ActionsWrapper";
import UserList from '../modules/Pages/UserList/UserList';
import { actionCreator } from '../PageConfigs/studentsListConfig';

const StudentListPage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <UserList />
  </ActionsWrapper>
);

export default StudentListPage