import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { didHydrate } from '~/src/store/hydrate/action';
import { hydrate } from '~/src/store/hydrate/selector';

export const HydrateContext = createContext<boolean>(false);

export const HydrateProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const isHydrated = useSelector(hydrate);
  useEffect(() => {
    dispatch(didHydrate())
  }, [dispatch]);

  return (
    <HydrateContext.Provider value={isHydrated}>
      {children}
    </HydrateContext.Provider>
  )
}