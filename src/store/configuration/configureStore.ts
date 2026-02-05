import { createStore, compose, applyMiddleware, UnknownAction, Store, Middleware, Dispatch } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { ApplicationState, ConfigureStore } from "./constants";
import { onError } from './helpers';
import reduxPromiseListener from './reduxPromiseListener';
import { setAuthorizationProvider } from '~/src/api/api';
import { createReduxHistoryContext } from "redux-first-history";
import { History } from 'history';

export interface Config {
  store: Store<ApplicationState, UnknownAction, ApplicationState>;
  rootSagaTask: Task<any>;
  reduxHistory: History & {
    listenObject: boolean;
  };
}
const configureStore: ConfigureStore = async (
  initialState,
  history,
  rootReducerFactory,
  rootSaga,
): Promise<Config> => {
  const sagaMiddleware = createSagaMiddleware({ onError });
  const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history,
  });

  const middlewares: Middleware[] = [
    sagaMiddleware,
    reduxPromiseListener.middleware,
  ];


  if (process.env.NODE_ENV !== 'production') {
    /* eslint @typescript-eslint/no-var-requires: "off" */
    const { default: reduxImmutable } = await import('redux-immutable-state-invariant');

    middlewares.unshift(reduxImmutable() as Middleware<any, any, Dispatch<UnknownAction>>);
  }

  // If devTools is installed, connect to it
  const windowIfDefined: Window | null = typeof window === 'undefined' ? null : window;
  const composeEnhancers = (windowIfDefined?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const composedMiddlewares = composeEnhancers(
    applyMiddleware(...middlewares, routerMiddleware),
  );

  const store: Store<ApplicationState, UnknownAction, ApplicationState> = createStore(
    rootReducerFactory(routerReducer),
    initialState,
    composedMiddlewares,
  );

  if (!SERVER_BUILD) {
    setAuthorizationProvider(() => store.getState().auth.auth.token)
  }

  const rootSagaTask = rootSaga && sagaMiddleware.run(rootSaga);
  const reduxHistory = createReduxHistory(store);

  return { store, rootSagaTask, reduxHistory };
};

export { configureStore };
