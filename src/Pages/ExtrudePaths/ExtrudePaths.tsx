import React, { FC } from 'react';
import { Switch, Route } from 'react-router';

interface ExcludePathsProps {
  paths: string[] | undefined;
}

const ExcludePaths: FC<ExcludePathsProps> = ({ paths = [], children }) => {
  if (!Boolean(paths.length)) {
    return <>{children}</>
  }

  return (
    <Switch>
      <Route path={paths} exact />
      {children}
    </Switch>
  )
};

export default ExcludePaths;
