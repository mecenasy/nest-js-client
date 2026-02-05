import React from 'react'
import { HistoryRouter as RouterSelector } from "redux-first-history/rr6";
import { StaticRouter } from "react-router-dom";
import { History } from 'history';

export interface RouterProps {
  history: History;
  url?: string;
  children: React.ReactNode
}


const Router = ({
  children,
  history,
  url,
}: RouterProps) => {
  if (SERVER_BUILD) {
    return (
      <StaticRouter location={url ?? ''}>
        {children}
      </StaticRouter>
    );
  }

  return (
    <RouterSelector history={history}>
      {children}
    </RouterSelector>
  );
};

export default Router;
