import React from "react";
import { Route, Routes, useLocation } from "react-router";
import { menuConfig } from "./PageConfigs/menuConfig";
import { configs } from './PageConfigs/routesConfigs';
import { useTransition, animated } from '@react-spring/web';
import { AppContainer } from "./modules/Components/Containers/AppContainer/parts";
import Auth from "./Pages/Auth/Auth";

const AppContent = () => {
  const location = useLocation();

  const transitions = useTransition(
    location, {
    keys: ({ pathname }) => pathname,
    initial: { opacity: 1, transform: "translate(0%, 0)" },
    from: { opacity: 0, transform: "translate(100%, 0)" },
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: { opacity: 0, transform: "translate(-100%, 0)" }
  });

  return (
    <AppContainer>
      <Routes >
        {menuConfig.extrudeUrl?.map((path) => (
          <Route key={path} path={path} element={null} />
        ))}
        <Route path={'*'} element={<menuConfig.Component />} />
      </Routes>
      <Routes>
        <Route path={'*'} element={<Auth />} />
      </Routes>

      {transitions((style, item) => (
        <animated.div style={style} >
          <Routes location={item}>
            {configs.map(({ Component, url }) => (
              <Route key={url} path={url} element={<Component />} />
            ))}
          </Routes>
        </animated.div>
      ))}
    </AppContainer>
  )
};

export const App = () => (
  <Routes>
    <Route path={'*'} element={<AppContent />} />
  </Routes>
)
