import React, { createContext, useCallback } from "react";
import { UnknownAction } from "redux";

interface ActionProviderProps {
  children?: React.ReactNode
  actions: UnknownAction[]
}

export const ActionContext = createContext({})
export const ActionProvider = (
  { actions,
    children
  }: ActionProviderProps) => {
  const setActions = useCallback((a: UnknownAction[]) => {
    if (actions) {
      actions.push(...a)
    }
  }, [actions])

  return (
    <ActionContext.Provider value={{ setActions }} >
      {children}
    </ActionContext.Provider>
  )
}
