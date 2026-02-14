import { Action } from 'redux';

export const filterAction = (actions: Array<Action | boolean>) => actions.filter((a) => typeof a !== 'boolean');
