import { Task } from "@redux-saga/types";
import { RouterState } from "redux-first-history";
import { History } from "history";
import { UnknownAction, Reducer, Store } from "redux";
import { AuthState } from "../auth/constants";
import { CounterState } from "../counter/constants";
import { MenuState } from "../menu/constants";
import { Person, PersonAction } from "../person/constants";
import { MenuPanelState, } from "../panelMenu/constants";
import { UniversityState, UniversityAction } from "../university/constants";
import { UserListState, UserListAction } from '../userList/constants';
import { MessageState } from '../messages/constants';
import { panelMenuReducer } from '../panelMenu/reducer';
import { authCombinedReducer } from '../auth/reducers';
import { NotificationState } from '../notification/constants';
import { TimeTableAction, TimeTableState } from '../timeTable/constants';
import { Subject, SubjectAction } from '../subject/constants';
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
  subjectList: Subject[];
  grades: GradesState;
}

export interface ApplicationReducer extends Record<keyof ApplicationState, any> {
  didHydrated: Reducer<boolean>;
  auth: typeof authCombinedReducer;
  counter: Reducer<CounterState, UnknownAction>;
  person: Reducer<Person, PersonAction>;
  router: Reducer<RouterState, UnknownAction>;
  menu: Reducer<MenuState, UnknownAction>;
  panelMenu: typeof panelMenuReducer;
  university: Reducer<UniversityState, UniversityAction>;
  userList: Reducer<UserListState, UserListAction>;
  messageList: Reducer<MessageState, UnknownAction>;
  notification: Reducer<NotificationState, UnknownAction>;
  timeTable: Reducer<TimeTableState, TimeTableAction>;
  subjectList: Reducer<Subject[], SubjectAction>;
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
