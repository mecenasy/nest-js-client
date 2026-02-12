import { fork, all } from "@redux-saga/core/effects";

const context = (require as any).context('../', true, /sagas\.ts$/);

const allSagas = context.keys().flatMap((key: string) => {

  const mod = context(key);
  return Object.values(mod).filter(
    (exportedItem) => typeof exportedItem === 'function' && exportedItem.name.endsWith('Watcher')
  );
});

export function* rootSaga() {
  yield all(allSagas.map((saga: any) => fork(saga)));
}