import { fork, all } from "@redux-saga/core/effects";
import { authWatcher } from "../auth/sagas";
import { counterWatcher } from "../counter/sagas";
import { getMenuWatcher } from "../menu/sagas";
import { addPersonWatcher, getPersonWatcher } from "../person/sagas";
import { getRoleWatcher } from "../role/sagas";
import { menuItemsWatcher } from "../panelMenu/menu/sagas";
import { getUniversityWatcher } from "../university/sagas";
import { getUserListWatcher } from '../userList/sagas';

export function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(counterWatcher),
    fork(getMenuWatcher),
    fork(getPersonWatcher),
    fork(addPersonWatcher),
    fork(getRoleWatcher),
    fork(menuItemsWatcher),
    fork(getUniversityWatcher),
    fork(getUserListWatcher),
  ]);
}
