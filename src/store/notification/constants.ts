
export interface NotificationState {
  unReadedMessage: number;
}

export enum NotificationActionType {
  GetNotificationRequest = 'notification/GET_NOTIFICATION_REQUEST',
  GetNotificationSuccess = 'notification/GET_NOTIFICATION_SUCCESS',
  GetNotificationFail = 'notification/GET_NOTIFICATION_FAIL',

  NotificationStart = 'notification/START',
  NotificationEnd = 'notification/END',
  SetUnReadedMessage = 'notification/SET_UN_READED_MESSAGE',

  UnReadedUp = 'notification/UN_READED_UP',
  UnReadedDown = 'notification/UN_READED_DOWN',
}

export type NotificationAction = {
  type: NotificationActionType.NotificationStart;
} | {
  type: NotificationActionType.SetUnReadedMessage;
  unReaded: number;
} | {
  type: NotificationActionType.NotificationEnd;
} | {
  type: NotificationActionType.UnReadedUp;
} | {
  type: NotificationActionType.UnReadedDown;
} | {
  type: NotificationActionType.GetNotificationRequest;
} | {
  type: NotificationActionType.GetNotificationSuccess;
  payload: NotificationState;
} | {
  type: NotificationActionType.GetNotificationFail;
}

export const initialState: NotificationState = {
  unReadedMessage: 0,
};