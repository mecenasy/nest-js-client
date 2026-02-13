import { Task } from "@redux-saga/types";
import { RouterState } from "redux-first-history";
import { History } from "history";
import { UnknownAction, Reducer, Store } from "redux";
import { AuthState } from "../auth/constants";
import { CounterState } from "../counter/constants";
import { MenuState } from "../menu/constants";
import { Person } from "../person/constants";
import { MenuPanelState, } from "../panelMenu/constants";
import { UniversityState } from "../university/constants";
import { UserListState } from '../userList/constants';
import { MessageState } from '../messages/constants';
import { panelMenuReducer } from '../panelMenu/reducer';
import { authCombinedReducer } from '../auth/reducers';
import { NotificationState } from '../notification/constants';
import { TimeTableState } from '../timeTable/constants';
import { Subject } from '../subject/constants';
import { GradesState } from '../grade/constants';
import { gradeReducer } from '../grade/reducer';

export interface ApplicationState {
  didHydrated: boolean;
  auth: AuthState;
  counter: CounterState;
  person: Person;
  router: RouterState;
  menu: MenuState;
  panelMenu: MenuPanelState;
  university: UniversityState;
  userList: UserListState;
  messageList: MessageState;
  notification: NotificationState;
  timeTable: TimeTableState;
  subject: Subject[];
  grades: GradesState;
}

export interface ApplicationReducer extends Record<keyof ApplicationState, any> {
  didHydrated: Reducer<boolean>;
  auth: typeof authCombinedReducer;
  counter: Reducer<CounterState, UnknownAction>;
  person: Reducer<Person, UnknownAction>;
  router: Reducer<RouterState, UnknownAction>;
  menu: Reducer<MenuState, UnknownAction>;
  panelMenu: typeof panelMenuReducer;
  university: Reducer<UniversityState, UnknownAction>;
  userList: Reducer<UserListState, UnknownAction>;
  messageList: Reducer<MessageState, UnknownAction>;
  notification: Reducer<NotificationState, UnknownAction>;
  timeTable: Reducer<TimeTableState, UnknownAction>;
  subject: Reducer<Subject[], UnknownAction>;
  grades: typeof gradeReducer;
}

export type ConfigureStore = (
  initialState: ApplicationState | undefined,
  history: History,
  rootReducerFactory: (routerReducer: Reducer<RouterState>) => any,
  rootSaga: () => Iterator<any>,
) => Promise<{
  store: Store<ApplicationState, UnknownAction>,
  rootSagaTask: Task;
}>;
