import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import AppProvider from "./Providers/AppProvider";
import { configureStore, Config } from "./store/configuration/configureStore";
import { rootReducerFactory as rootReducerFactory } from "./store/configuration/rootReducer";
import { rootSaga } from "./store/configuration/rootSaga";
import { ApplicationState } from "./store/configuration/constants";
import { preloadReady } from '@react-loadable/revised';
import { history } from "../utils/history/history";
// import { createReduxHistory } from "./store/configuration/history";
// import { HistoryRouter } from "redux-first-history/rr6";
// import { hydrateInfo } from "./Pages/Hydrate/hydrate";

const renderApplication = async () => {
  const preloadPromise = preloadReady();
  const initialState: ApplicationState = window.__INITIAL_STATE__;

  const { store, reduxHistory } = (await configureStore(initialState, history, rootReducerFactory, rootSaga) as Config);

  await preloadPromise;

  hydrateRoot(
    document.getElementById("app") as HTMLElement,
    <AppProvider store={store} history={reduxHistory}>
      <App />
    </AppProvider>,

    // hydrateInfo.didHydrate,
  );
};

renderApplication();
