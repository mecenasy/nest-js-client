import React from 'react';
import { Provider } from 'react-redux';
import { UnknownAction, Store } from 'redux';
import { ApplicationState } from '../store/configuration/constants';
import { GlobalStyles } from './GlobalStyles';
import ResponsiveProvider, { ResponsiveProps } from './ResponsiveProvider/ResponsiveProvider';
import Router, { RouterProps } from './Router/Router';
import { HydrateProvider } from './HydrateProvider/HydrateProvider';

interface AppProviderProps extends RouterProps {
  store: Store<ApplicationState, UnknownAction>;
  defaultResponsive?: ResponsiveProps;
  children: React.ReactNode;
}

const AppProvider = ({
  store,
  url,
  history,
  defaultResponsive,
  children,
}: AppProviderProps) => (
  <Provider store={store}>
    <HydrateProvider>
      <ResponsiveProvider defaultState={defaultResponsive?.defaultState}>
        <Router
          url={url}
          history={history}
        >
          <GlobalStyles />
          {children}
        </Router>
      </ResponsiveProvider>
    </HydrateProvider>
  </Provider>
);

export default AppProvider;
