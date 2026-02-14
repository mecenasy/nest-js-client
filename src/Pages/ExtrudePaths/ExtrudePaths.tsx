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
  console.log("🚀 ~ ExcludePaths ~ paths:", paths)

  return (
    <Routes>
      {paths.map((path) => (
        <Route key={path} path={path} element={null} />
      ))}
      {children}
    </Routes>
  )
};

export default ExcludePaths;
