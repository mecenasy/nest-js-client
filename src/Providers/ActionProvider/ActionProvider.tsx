import React, { createContext, useCallback } from "react";
import { UnknownAction } from "redux";
import { ApplicationState } from '~/src/store/configuration/constants';

interface ActionProviderProps {
  children?: React.ReactNode;
  actions: UnknownAction[];
  reducersKey: Array<keyof ApplicationState>
  sagas: any[];
}

interface Context {
  setActions: (action: UnknownAction[], sagas: any) => void;
  setReducersKey: (keys: Array<keyof ApplicationState>) => void;
}

export const ActionContext = createContext<Context | undefined>(undefined);

export const ActionProvider = ({ actions, reducersKey, children }: ActionProviderProps) => {
  const setActions = useCallback((a: UnknownAction[], s: Array<keyof ApplicationState>) => {
    a.forEach((action) => {
      if (actions.every(({ type }) => type !== action.type)) {
        actions.push(action);
      }
    });
  }, [actions])

  const setReducersKey = useCallback((keys: Array<keyof ApplicationState>) => {
    if (reducersKey) {
      reducersKey.push(...keys);
    }
  }, [reducersKey])

  return (
    <ActionContext.Provider value={{ setActions, setReducersKey }} >
      {children}
    </ActionContext.Provider>
  )
}
