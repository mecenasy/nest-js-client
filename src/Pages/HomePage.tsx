import React, { FC } from "react";
import Home from "../modules/Pages/Home/Home";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { ActionCreatorFactory } from '../PageConfigs/constants';

const actionCreator: ActionCreatorFactory = () => [];

const HomePage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <Home />
  </ActionsWrapper>
);

export default HomePage
