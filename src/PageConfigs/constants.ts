import { ComponentType } from "react";
import { PathMatch } from 'react-router';
import { Action } from "redux";

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
) => Array<Action | boolean>;

export interface PageConfig {
  extrudeUrl?: string[];
  url: string;
  Component: ComponentType;
  exact?: boolean;
}
