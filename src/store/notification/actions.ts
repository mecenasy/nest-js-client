import {
  NotificationActionType,
  NotificationAction,
  NotificationState
} from './constants';

export const GetNotificationRequest = (): NotificationAction => ({
  type: NotificationActionType.GetNotificationRequest,
});

export const GetNotificationSuccess = (payload: NotificationState): NotificationAction => ({
  type: NotificationActionType.GetNotificationSuccess,
  payload,
});

export const GetNotificationFail = (): NotificationAction => ({
  type: NotificationActionType.GetNotificationFail,
});


export const notificationStart = (): NotificationAction => ({
  type: NotificationActionType.NotificationStart,
});

export const setUnReadedMessage = (unReaded: number): NotificationAction => ({
  type: NotificationActionType.SetUnReadedMessage,
  unReaded
});

export const notificationEnd = (): NotificationAction => ({
  type: NotificationActionType.NotificationEnd,
});

export const unReadedUp = (): NotificationAction => ({
  type: NotificationActionType.UnReadedUp,
});

export const unReadedDown = (): NotificationAction => ({
  type: NotificationActionType.UnReadedDown,
});
