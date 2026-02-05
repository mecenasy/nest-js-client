import React from 'react';
import { Routes, Route } from 'react-router';

interface ExcludePathsProps {
  paths: string[] | undefined;
  children?: React.ReactNode;
}

const ExcludePaths = ({ paths = [], children }: ExcludePathsProps) => {
  if (!Boolean(paths.length)) {
    return <>{children}</>
  }

  return (
    <Routes>
      {paths.map((path) => (
        <Route key={path} path={path} />
      ))}
      {children}
    </Routes>
  )
};

export default ExcludePaths;
