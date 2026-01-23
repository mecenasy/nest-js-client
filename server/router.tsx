import express, { NextFunction, Request, Response } from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouterContext } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { Capture } from '@react-loadable/revised';
import { END } from '@redux-saga/core';
import { App } from '../src/App';
import { getBundles, LoadableManifest } from '@react-loadable/revised/webpack';
import {
  generateHtml,
  getModules,
  getManifest,
} from './helpers';
import AppProvider from '../src/Providers/AppProvider';
import { configureStore } from '../src/store/configuration/configureStore';
import { rootReducerFactory } from '../src/store/configuration/rootReducer';
import { rootSaga } from '../src/store/configuration/rootSaga';
import { history } from '../utils/history/history';
import { ActionProvider } from '../src/Providers/ActionProvider/ActionProvider';
import { AnyAction } from 'redux';
import { setAuthorizationProvider } from '~/src/api/api';
import { logoutSuccess, refreshTokenRequest } from '~/src/store/auth/actions';

const router = express.Router();
const DEV = process.env.NODE_ENV !== 'production';
const stats: LoadableManifest = getManifest();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith('/build')) {
    next();
    return;
  }

  if (req.headers.cookie) {
    setAuthorizationProvider(() => req.cookies['jwt'])
  }

  const context: StaticRouterContext = {};
  const modules: string[] = [];
  const sheet = new ServerStyleSheet();

  // pre render
  const { store, rootSagaTask } = await configureStore(undefined, history, rootReducerFactory, rootSaga);

  const actions: AnyAction[] = [];

  ReactDomServer.renderToString(
    <ActionProvider actions={actions}>
      <AppProvider
        store={store}
        url={req.url}
        history={history}
        routerContext={context}
      >
        <App />
      </AppProvider>
    </ActionProvider >
  );

  if (req.cookies['jwt']) {
    if (DEV) {
      console.log('[server]', 'Login')
    }
    store.dispatch(refreshTokenRequest());
  } else {
    if (DEV) {
      console.log('[server]', 'Logout')
    }
    store.dispatch(logoutSuccess());
  }

  if (actions.length) {
    actions.forEach((action) => {
      if (DEV) {
        console.log('[server]', action.type)
      }
      store.dispatch(action);
    });
  }

  store.dispatch(END);

  if (rootSagaTask) {
    try {
      await rootSagaTask.toPromise();
    } catch (error: Error | any) {
      if (error.message === 'ROOT_SAGA_TIMEOUT') {
        console.error(`[TIMEOUT when waiting for sagas to finish`);
      }
      return;
    }
  }

  const {
    isMobile,
    isTablet,
    isDesktop,
  } = req.useragent || {};

  //final render
  const app = (
    <Capture report={getModules(modules)} >
      <AppProvider
        defaultResponsive={{
          isMobile,
          isTablet,
          isDesktop,
        }}
        store={store}
        url={req.url}
        history={history}
        routerContext={context}
      >
        <App />
      </AppProvider>
    </Capture >
  );

  const { url: redirectUrl, statusCode } = context;

  if (redirectUrl) {
    res.redirect(statusCode || 301, redirectUrl);
    return;
  }

  const body = ReactDomServer.renderToString(sheet.collectStyles(app));

  const metaTags = Helmet.renderStatic();
  let bundlesScripts: ReturnType<typeof getBundles> = { assets: [], prefetch: [], preload: [] };
  try {
    bundlesScripts = getBundles(stats, modules as string[]);
  } catch (error) {
    console.warn('[server] getBundles error, continuing without bundles', error);
    bundlesScripts = { assets: [], prefetch: [], preload: [] };
  }
  const styles = sheet.getStyleTags();
  const initialState = store.getState();

  const html = generateHtml(body, styles, metaTags, bundlesScripts, initialState);

  res.send(html);
});

export {
  router
}
