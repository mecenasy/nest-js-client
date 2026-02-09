import { Task } from "@redux-saga/types";
import { RouterState } from "redux-first-history";
import { History } from "history";
import { UnknownAction, Reducer, Store } from "redux";
import { AuthState } from "../auth/constants";
import { CounterState, CounterAction } from "../counter/constants";
import { MenuState, MenuAction } from "../menu/constants";
import { Person, PersonAction } from "../person/constants";
import { MenuPanelState, } from "../panelMenu/constants";
import { UniversityState, UniversityAction } from "../university/constants";
import { UserListState, UserListAction } from '../userList/constants';
import { MessageState, MessageAction } from '../messages/constants';
import { panelMenuReducer } from '../panelMenu/reducer';
import { authCombinedReducer } from '../auth/reducers';
import { NotificationAction, NotificationState } from '../notification/constants';
import { TimeTableAction, TimeTableState } from '../timeTable/constants';

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
}

export interface ApplicationReducer extends Record<keyof ApplicationState, any> {
  didHydrated: Reducer<boolean>;
  auth: typeof authCombinedReducer;
  counter: Reducer<CounterState, CounterAction>;
  person: Reducer<Person, PersonAction>;
  router: Reducer<RouterState, UnknownAction>;
  menu: Reducer<MenuState, MenuAction>;
  panelMenu: typeof panelMenuReducer;
  university: Reducer<UniversityState, UniversityAction>;
  userList: Reducer<UserListState, UserListAction>;
  messageList: Reducer<MessageState, MessageAction>;
  notification: Reducer<NotificationState, NotificationAction>;
  timeTable: Reducer<TimeTableState, TimeTableAction>;
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

