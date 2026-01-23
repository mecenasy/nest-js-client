import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { authCombinedReducer } from "../auth/reducers";
import { counterReducer } from "../counter/reducers";
import { menuReducer } from "../menu/reducers";
import { personReducer } from "../person/reducer";
import { panelMenuReducer } from "../panelMenu/reducer";
import { ApplicationState } from "./constants";
import { studentReducer } from "../student/reducer";

export const rootReducerFactory = (history: History) => (
  combineReducers<ApplicationState>({
    auth: authCombinedReducer,
    counter: counterReducer,
    router: connectRouter(history),
    menu: menuReducer,
    person: personReducer,
    panelMenu: panelMenuReducer,
    studentData: studentReducer
  })
);
