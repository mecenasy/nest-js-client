import { ComponentType } from 'react';
import { PathMatch } from 'react-router';
import { Action } from 'redux';
import { ApplicationState } from '../store/configuration/constants';

export interface ActionCreationConditions {
  isServer?: boolean;
  isMount?: boolean;
  isUpdate?: boolean;
  isHydrated?: boolean;
}

export interface PageLocation {
  search?: string;
  query?: string;
  pathname?: string;
  path?: string;
  hash?: string;
}

export type ActionCreatorFactory = (
  condition: ActionCreationConditions,
  location: PageLocation,
  match: PathMatch<string> | null,
) => Array<Action>;

export type ReducerFactory = (inject: boolean, force?: boolean) => Array<keyof ApplicationState>;

export interface PageConfig {
  extrudeUrl?: string[];
  url: string;
  Component: ComponentType;
  exact?: boolean;
}
