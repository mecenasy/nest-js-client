import { MessageState, MessageAction, MessageActionType, initialState } from './constants';

export const messageReducer = (state: MessageState = initialState, action: MessageAction): MessageState => {
  switch (action.type) {
    case MessageActionType.SendMessageRequest:
    case MessageActionType.GetMessageListRequest:
    case MessageActionType.GetMessageRequest: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case MessageActionType.SendMessageSuccess: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case MessageActionType.SendMessageFail:
    case MessageActionType.GetMessageListFail:
    case MessageActionType.GetMessageFail: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case MessageActionType.GetMessageListSuccess: {
      return {
        ...state,
        isFetching: false,
        messages: action.payload.messages,
        pagination: action.payload.pagination,
      };
    }
    case MessageActionType.GetMessageSuccess: {
      return {
        ...state,
        isFetching: false,
        messageDi: {
          ...state.messageDi,
          [action.payload.id]: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
