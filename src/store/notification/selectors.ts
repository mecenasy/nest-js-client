import { ApplicationState } from '../configuration/constants';

export const unReadedSelector = (state: ApplicationState): number => state.notification.unReadedMessage;
