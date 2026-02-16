import { UnknownAction, Middleware, Dispatch } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { ApplicationState, ConfigureStore } from './constants';
import { onError } from './helpers';
import reduxPromiseListener from './reduxPromiseListener';
import { setAuthorizationProvider } from '~/src/api/api';
import { createReduxHistoryContext } from 'redux-first-history';
import { History } from 'history';
import { createStore, injectReducer } from './rootReducer';
import { EnhancedStore } from '@reduxjs/toolkit';

export interface Config {
  store: EnhancedStore<ApplicationState>;
  rootSagaTask: Task<any>;
  reduxHistory: History & {
    listenObject: boolean;
  };
}
const configureStore: ConfigureStore = async (
  initialState,
  history,
  rootSaga,
  reducerLeys,
): Promise<Config> => {
  const sagaMiddleware = createSagaMiddleware({ onError });
  const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history,
  });

  const middlewares: Middleware[] = [sagaMiddleware, reduxPromiseListener.middleware];

  if (process.env.NODE_ENV !== 'production') {
    /* eslint @typescript-eslint/no-var-requires: "off" */
    const { default: reduxImmutable } = await import('redux-immutable-state-invariant');

    middlewares.unshift(reduxImmutable() as Middleware<any, any, Dispatch<UnknownAction>>);
  }

  injectReducer('router', routerReducer);
  const store: EnhancedStore<ApplicationState> = createStore(
    () => [...middlewares, routerMiddleware],
    initialState,
    reducerLeys,
  );

  if (!SERVER_BUILD) {
    setAuthorizationProvider(() => store.getState().auth.token);
  }

  const rootSagaTask = rootSaga && sagaMiddleware.run(rootSaga);
  const reduxHistory = createReduxHistory(store);

  return { store, rootSagaTask, reduxHistory };
};

export { configureStore };
