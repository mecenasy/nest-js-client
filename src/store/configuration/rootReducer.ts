import { combineReducers, Reducer } from "redux";
import { RouterState } from "redux-first-history";
import { counterReducer } from "../counter/reducers";
import { menuReducer } from "../menu/reducers";
import { personReducer } from "../person/reducer";
import { ApplicationReducer } from "./constants";
import { universityReducer } from "../university/reducer";
import { userListReducer } from '../userList/reducer';
import { messageReducer } from '../messages/reducer';
import { hydrateReducer } from '../hydrate/reducer';
import { notificationReducer } from '../notification/reducer';
import { timeTableReducer } from '../timeTable/reducer';
import { subjectReducer } from '../subject/reducer';
import { gradeReducer } from '../grade/reducer';
import { authReducer, userReducer } from '../auth/reducers';
import { roleReducer } from '../role/reducer';
import { panelMenuReducer } from '../panelMenu/reducers';

export const rootReducerFactory = (routerReducer: Reducer<RouterState>) => (
  combineReducers<ApplicationReducer>({
    hydrate: hydrateReducer,
    auth: authReducer,
    user: userReducer,
    counter: counterReducer,
    router: routerReducer,
    menu: menuReducer,
    person: personReducer,
    panelMenu: panelMenuReducer,
    role: roleReducer,
    university: universityReducer,
    userList: userListReducer,
    messageList: messageReducer,
    notification: notificationReducer,
    timeTable: timeTableReducer,
    subject: subjectReducer,
    grades: gradeReducer
  })
);
