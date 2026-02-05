import { call, put, takeLatest } from 'redux-saga/effects';
import { addMenuItem, getMenu, removeMenuItem } from '~/src/api/panelMenu/requests';
import { LoggedStatus } from '../../auth/constants';
import { waitForAuthStatus } from '../../auth/sagas';
import { getMenuItemsSuccess, getMenuItemsFail, setMenuItemsSuccess, removeMenuItemsSuccess, removeMenuItemsFail, setMenuItemsFail } from './actions';
import { MenuItemActionType, MenuItemAction } from './constants';

export function* menuItemsWatcher() {
  yield takeLatest(MenuItemActionType.GetMenuItemsRequest, getMenuWorker);
  yield takeLatest(MenuItemActionType.SetMenuItemsRequest, setMenuWorker);
  yield takeLatest(MenuItemActionType.RemoveMenuItemsRequest, removeMenuWorker);
}

export function* getMenuWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data } = yield call(getMenu);

      yield put(getMenuItemsSuccess(data));

    } catch (error: any) {
      yield put(getMenuItemsFail(error));
    }
  }
}

export function* setMenuWorker(action: MenuItemAction) {
  if (action.type === MenuItemActionType.SetMenuItemsRequest) {
    try {
      yield call(addMenuItem, action.item);

      yield put(setMenuItemsSuccess());

    } catch (error: any) {
      yield put(setMenuItemsFail(error));
    }
  }

}

export function* removeMenuWorker(action: MenuItemAction) {
  if (action.type === MenuItemActionType.RemoveMenuItemsRequest) {
    try {
      yield call(removeMenuItem, action.id);

      yield put(removeMenuItemsSuccess());

    } catch (error: any) {
      yield put(removeMenuItemsFail(error));
    }
  }

}
