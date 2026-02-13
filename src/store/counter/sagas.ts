import { takeEvery, put } from 'redux-saga/effects';
import { incrementByCount, incrementByCountRequest } from './reducers';

export function* counterWatcher() {
  yield takeEvery(incrementByCountRequest.type, counterWorker);
}

function* counterWorker(action: ReturnType<typeof incrementByCountRequest>) {
  if (action.type === incrementByCountRequest.type) {
    yield put(incrementByCount(action.payload));
  }
}
