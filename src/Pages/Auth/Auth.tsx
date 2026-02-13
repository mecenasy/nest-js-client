import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { LoggedStatus } from '../../store/auth/constants';
import { loggedInStatusSelector } from '../../store/auth/reducers';
import { ServerStatusContext } from '~/src/Providers/ServerProvider/ServerStatusProvider';

const Auth = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const severContext = useContext(ServerStatusContext);

  const location = useLocation();
  const loginPath = '/login';

  if (isLoggedIn === LoggedStatus.LoggedIn
    || isLoggedIn === LoggedStatus.Unknown
    || location.pathname === loginPath) {
    return null;
  }

  if (severContext) {
    severContext.url = loginPath
    return null;
  }

  return <Navigate to={loginPath} replace />;
};

export default Auth;
