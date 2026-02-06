import { initialState, NotificationAction, NotificationActionType, NotificationState } from './constants';

export const notificationReducer = (state: NotificationState = initialState, action: NotificationAction): NotificationState => {
  switch (action.type) {

    case NotificationActionType.GetNotificationSuccess: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case NotificationActionType.SetUnReadedMessage: {
      return {
        ...state,
        unReadedMessage: action.unReaded,
      };
    }
    case NotificationActionType.UnReadedUp: {
      const newState = state.unReadedMessage;
      return {
        ...state, unReadedMessage: newState + 1,
      };
    }
    case NotificationActionType.UnReadedDown: {
      const newState = state.unReadedMessage;
      return {
        ...state,
        unReadedMessage: newState - 1,
      };
    }
    default:
      return state;
  }
};
