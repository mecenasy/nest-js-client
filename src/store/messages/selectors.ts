import { createSelector } from 'reselect';
import { ApplicationState } from '../configuration/constants';
import { MessageState, SimpleMessage, Message } from './constants';

const messageStateSelector = (state: ApplicationState): MessageState => state.messageList;

export const getMessagesList = createSelector(
  [messageStateSelector],
  (state: MessageState): SimpleMessage[] => state.messages,
);

export const getMessageById = createSelector(
  [messageStateSelector, (state: ApplicationState, id: string | null) => id],
  (state: MessageState, id: string | null): Message | undefined => {
    if (!id) {
      return undefined;
    }
    return state.messageDi[id];
  },
);

export const isFetchingMessages = createSelector(
  [messageStateSelector],
  (state: MessageState): boolean => state.isFetching,
);
