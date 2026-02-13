import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { didHydrate, didHydrateSelector } from '~/src/store/hydrate/reducer';

export const HydrateContext = createContext<boolean>(false);

export const HydrateProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const isHydrated = useSelector(didHydrateSelector);
  useEffect(() => {
    dispatch(didHydrate())
  }, [dispatch]);

  return (
    <HydrateContext.Provider value={isHydrated}>
      {children}
    </HydrateContext.Provider>
  )
}