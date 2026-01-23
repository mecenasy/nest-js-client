import React, { FC } from "react";
import AddUser from "../modules/Pages/AddUser/AddUser";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { actionCreator } from '../PageConfigs/addUserConfig';

const AddUserPage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <AddUser />
  </ActionsWrapper>
);

export default AddUserPage