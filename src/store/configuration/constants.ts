import { Task } from "@redux-saga/types";
import { RouterState } from "redux-first-history";
import { History } from "history";
import { UnknownAction, Reducer, Store } from "redux";
import { Auth, User } from "../auth/constants";
import { CounterState } from "../counter/constants";
import { MenuState } from "../menu/constants";
import { Person } from "../person/constants";
import { UniversityState } from "../university/constants";
import { UserListState } from '../userList/constants';
import { MessageState } from '../messages/constants';
import { NotificationState } from '../notification/constants';
import { TimeTableState } from '../timeTable/constants';
import { Subject } from '../subject/constants';
import { GradesState } from '../grade/constants';
import { gradeReducer } from '../grade/reducer';
import { MenuItem } from '../panelMenu/constants';
import { EnhancedStore } from '@reduxjs/toolkit';

export interface ApplicationState {
  hydrate: boolean;
  auth: Auth;
  user: User;
  counter: CounterState;
  person: Person;
  router: RouterState;
  menu: MenuState;
  panelMenu: MenuItem[];
  role: string[];
  university: UniversityState;
  userList: UserListState;
  messageList: MessageState;
  notification: NotificationState;
  timeTable: TimeTableState;
  subject: Subject[];
  grades: GradesState;
}

export interface ApplicationReducer extends Record<keyof ApplicationState, any> {
  hydrate: Reducer<boolean>;
  auth: Reducer<Auth>;
  user: Reducer<User>
  counter: Reducer<CounterState>;
  person: Reducer<Person>;
  router: Reducer<RouterState>;
  menu: Reducer<MenuState>;
  panelMenu: Reducer<MenuItem[]>;
  role: Reducer<string[]>;
  university: Reducer<UniversityState>;
  userList: Reducer<UserListState>;
  messageList: Reducer<MessageState>;
  notification: Reducer<NotificationState>;
  timeTable: Reducer<TimeTableState>;
  subject: Reducer<Subject[]>;
  grades: typeof gradeReducer;
}

export type ConfigureStore = (
  initialState: ApplicationState | undefined,
  history: History,
  rootSaga: () => Iterator<any>,
  reducerKeys?: Array<keyof ApplicationState>,
) => Promise<{
  store: EnhancedStore<ApplicationState>,
  rootSagaTask: Task;
}>;
