import React, { FC } from 'react';
import { actionCreator } from '../PageConfigs/subjectConfig'
import ActionsWrapper from './Actions/ActionsWrapper';
import Subject from '../modules/Pages/Subject/Subject';

const ChangePasswordPage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <Subject />
  </ActionsWrapper>
);

export default ChangePasswordPage;
