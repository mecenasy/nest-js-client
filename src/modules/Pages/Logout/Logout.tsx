import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { ServerStatusContext } from '~/src/Providers/ServerProvider/ServerStatusProvider';
import { LoggedStatus } from '~/src/store/auth/constants';
import { loggedInStatusSelector } from '~/src/store/auth/reducers';

const Logout = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const severContext = useContext(ServerStatusContext);

  if (isLoggedIn === LoggedStatus.LoggedIn) {
    return null;
  }
  if (severContext) {
    severContext.url = '/login'
    return null;
  }

  return <Navigate to='/login' />
};

export default Logout;
