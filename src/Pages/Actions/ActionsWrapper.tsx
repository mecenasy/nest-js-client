import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreatorFactory } from '../../PageConfigs/constants';
import { ActionContext } from '../../Providers/ActionProvider/ActionProvider';
import { useLocation, useMatch, useParams } from 'react-router-dom';
import { HydrateContext } from '~/src/Providers/HydrateProvider/HydrateProvider';
import { ApplicationState } from '~/src/store/configuration/constants';

interface Props {
  actionCreatorFactory: ActionCreatorFactory;
  children: React.ReactNode;
  reducersKey?: Array<keyof ApplicationState>;
}

const ActionsWrapper: React.FC<Props> = ({ actionCreatorFactory, reducersKey = [], children }) => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const match = useMatch(location.pathname);
  const isHydrated = useContext(HydrateContext);
  const actionContext = useContext(ActionContext);

  const dispatchAction = (condition: 'mount' | 'server' | 'update', isMount?: boolean, isUpdate?: boolean) => {
    const actions = actionCreatorFactory?.(
      { isServer: SERVER_BUILD, isMount, isHydrated, isUpdate },
      location,
      match,
    );

    if (actions?.length) {
      actions.forEach((action) => {
        if (typeof action === 'object') {
          if (DEV) {
            console.log(condition, action.type);
          }
          dispatch(action);
        }
      });
    }
  };

  if (SERVER_BUILD) {
    const actions = actionCreatorFactory?.(
      { isServer: true },
      location,
      match,
    ).filter((a) => a);

    if (actionContext) {

      if (actions?.length) {
        actionContext.setActions(actions, reducersKey);
      }
      actionContext.setReducersKey(reducersKey);
    }
  }

  useEffect(() => {
    dispatchAction('mount', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    dispatchAction('update', true, true);
  }, [location.search, params, match?.pathname]);

  if (actionContext) {
    return null
  }
  return <>{children}</>;
};

export default ActionsWrapper;
