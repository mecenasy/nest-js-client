import { fork, all } from "@redux-saga/core/effects";
import { authWatcher } from "../auth/sagas";
import { counterWatcher } from "../counter/sagas";
import { getMenuWatcher } from "../menu/sagas";
import { personWatcher } from "../person/sagas";
import { getRoleWatcher } from "../role/sagas";
import { menuItemsWatcher } from "../panelMenu/sagas";
import { getUniversityWatcher } from "../university/sagas";
import { getUserListWatcher } from '../userList/sagas';
import { notificationWatcher } from '../notification/sagas';
import { timeTableWatcher } from '../timeTable/sagas';
import { subjectWatcher } from '../subject/sagas';
import { messageWatcher } from '../messages/sagas';
import { gradeSagaWatcher } from '../grade/sagas';

export function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(counterWatcher),
    fork(getMenuWatcher),
    fork(personWatcher),
    fork(getRoleWatcher),
    fork(menuItemsWatcher),
    fork(getUniversityWatcher),
    fork(getUserListWatcher),
    fork(messageWatcher),
    fork(notificationWatcher),
    fork(timeTableWatcher),
    fork(subjectWatcher),
    fork(gradeSagaWatcher)
  ]);
}
