import { ApplicationReducer, ApplicationState } from './constants';
import { authReducer, userReducer } from '../auth/reducers';
import {
  configureStore,
  combineReducers,
  Reducer,
  EnhancedStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { hydrateReducer } from '../hydrate/reducer';

export const createLazyStore = () => {
  let store: EnhancedStore<ApplicationState>;
  const registryPages = new Set<string>();
  const defaultKeys: Array<keyof ApplicationState> = ['hydrate', 'auth', 'user', 'router'];
  const asyncReducers: ReducersMapObject<ApplicationState> = {
    hydrate: hydrateReducer,
    auth: authReducer,
    user: userReducer,
  } as ReducersMapObject<ApplicationState>;

  const createReducer = (
    asyncReducers: ReducersMapObject<ApplicationState>,
  ): Reducer<ApplicationState> => {
    return combineReducers({
      ...asyncReducers,
    });
  };

  const createStore = (
    middleware: any,
    preloadedState?: ApplicationState,
    reducersKeys?: Array<keyof ApplicationState>,
  ) => {
    const reducer: any = {};
    const state: any = {};

    if (reducersKeys) {
      defaultKeys.concat(reducersKeys).forEach((key) => {
        reducer[key] = asyncReducers[key];
        if (preloadedState) {
          state[key] = preloadedState?.[key];
        }
      });
    }

    store = configureStore<ApplicationState>({
      reducer: createReducer(reducersKeys ? reducer : asyncReducers),
      preloadedState: reducersKeys ? state : preloadedState,
      middleware: (getDefault) => (middleware ? middleware(getDefault) : getDefault()),
    });

    return store;
  };

  const injectReducer = (key: keyof ApplicationReducer, asyncReducer: Reducer<any>) => {
    if (!asyncReducers[key]) {
      asyncReducers[key] = asyncReducer;
    }
  };
  const registerReducer = (key: string) => {
    if (!registryPages.has(key)) {
      registryPages.add(key);
      store.replaceReducer(createReducer(asyncReducers));
    }
    return asyncReducers;
  };

  return { createStore, injectReducer, registerReducer };
};

export const { createStore, injectReducer, registerReducer } = createLazyStore();
