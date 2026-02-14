import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import AppProvider from "./Providers/AppProvider";
import { configureStore, Config } from "./store/configuration/configureStore";
import { rootSaga } from "./store/configuration/rootSaga";
import { ApplicationState } from "./store/configuration/constants";
import { preloadReady } from '@react-loadable/revised';
import { history } from "../utils/history/history";

const renderApplication = async () => {
  const preloadPromise = preloadReady();
  const initialState: ApplicationState = window.__INITIAL_STATE__;

  await preloadPromise;

  const { store, reduxHistory } = (await configureStore(initialState, history, rootSaga) as Config);

  hydrateRoot(
    document.getElementById("app") as HTMLElement,
    <AppProvider store={store} history={reduxHistory}>
      <App />
    </AppProvider>,
  );
};

renderApplication();
