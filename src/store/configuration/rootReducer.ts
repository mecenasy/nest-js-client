import { combineReducers, Reducer } from "redux";
import { RouterState } from "redux-first-history";
import { authCombinedReducer } from "../auth/reducers";
import { counterReducer } from "../counter/reducers";
import { menuReducer } from "../menu/reducers";
import { personReducer } from "../person/reducer";
import { panelMenuReducer } from "../panelMenu/reducer";
import { ApplicationReducer } from "./constants";
import { universityReducer } from "../university/reducer";
import { userListReducer } from '../userList/reducer';
import { messageReducer } from '../messages/reducer';
import { hydrateReducer } from '../hydrate/reducer';
import { notificationReducer } from '../notification/reducer';

export const rootReducerFactory = (routerReducer: Reducer<RouterState>) => (
  combineReducers<ApplicationReducer>({
    didHydrated: hydrateReducer,
    auth: authCombinedReducer,
    counter: counterReducer,
    router: routerReducer,
    menu: menuReducer,
    person: personReducer,
    panelMenu: panelMenuReducer,
    university: universityReducer,
    userList: userListReducer,
    messageList: messageReducer,
    notification: notificationReducer,
  })
);


