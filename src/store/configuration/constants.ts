import { Task } from "@redux-saga/types";
import { RouterState } from "connected-react-router";
import { History } from "history";
import { AnyAction, Reducer, Store } from "redux";
import { AuthState } from "../auth/constants";
import { CounterState } from "../counter/constants";
import { MenuState } from "../menu/constants";
import { Person } from "../person/constants";
import { MenuPanelState } from "../panelMenu/constants";
import { UniversityState } from "../university/constants";
import { UserList } from '../userList/constants';

export interface ApplicationState {
  auth: AuthState;
  counter: CounterState;
  person: Person;
  router: RouterState;
  menu: MenuState;
  panelMenu: MenuPanelState;
  university: UniversityState;
  userList: UserList;
}

export type ConfigureStore = (
  initialState: ApplicationState | undefined,
  history: History,
  rootReducerFactory: (history: History) => Reducer<ApplicationState>,
  rootSaga: () => Iterator<any>,
) => Promise<{
  store: Store<ApplicationState, AnyAction>,
  rootSagaTask: Task;
}>;

