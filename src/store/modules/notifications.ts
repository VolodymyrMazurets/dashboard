import { ActionTypes, AppThunk, NotificationsActionTypes } from "../types";

import { NotificationType } from "../../types/entities";
import { httpService } from "../../services";

export interface NotificationsState {
  loading: boolean;
  error: boolean;
  notifications: NotificationType[];
  count: number | null;
}

const initialState: NotificationsState = {
  loading: false,
  error: false,
  notifications: [],
  count: null,
};

export const notificationsReducer = (
  state = initialState,
  action: NotificationsActionTypes
): NotificationsState => {
  switch (action.type) {
    case ActionTypes.NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.NOTIFICATIONS_UPDATE: {
      return {
        ...state,
        notifications: [...action.payload],
      };
    }
    case ActionTypes.NOTIFICATIONS_COUNT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.NOTIFICATIONS_COUNT_UPDATE: {
      return {
        ...state,
        count: action.payload,
      };
    }
    default:
      return state;
  }
};

export const notificationsActions = {
  [ActionTypes.NOTIFICATIONS_REQUEST]: (): AppThunk => async (dispatch) => {
    dispatch({ type: ActionTypes.NOTIFICATIONS_REQUEST });
    const response = await httpService.getNotifications();
    if (response) {
      dispatch({ type: ActionTypes.NOTIFICATIONS_SUCCESS });
      dispatch({ type: ActionTypes.NOTIFICATIONS_UPDATE, payload: response });
    } else {
      dispatch({ type: ActionTypes.NOTIFICATIONS_FAILURE });
    }
    return response;
  },
  [ActionTypes.NOTIFICATIONS_COUNT_REQUEST]: (): AppThunk => async (
    dispatch
  ) => {
    dispatch({ type: ActionTypes.NOTIFICATIONS_COUNT_REQUEST });
    const response = await httpService.getNotificationsCount();
    if (response) {
      dispatch({ type: ActionTypes.NOTIFICATIONS_SUCCESS });
      dispatch({ type: ActionTypes.NOTIFICATIONS_COUNT_UPDATE, payload: response });
    } else {
      dispatch({ type: ActionTypes.NOTIFICATIONS_FAILURE });
    }
    return response;
  },
  [ActionTypes.NOTIFICATIONS_DISMISS]: (notificationId: string | undefined): AppThunk => async (
    dispatch,
  ) => {
    dispatch({ type: ActionTypes.NOTIFICATIONS_REQUEST });
    const response = await httpService.postNotificationsDismiss(notificationId);
    if (response) {
      dispatch({ type: ActionTypes.NOTIFICATIONS_SUCCESS });
      dispatch({ type: ActionTypes.NOTIFICATIONS_UPDATE, payload: response });
    } else {
      dispatch({ type: ActionTypes.NOTIFICATIONS_FAILURE });
    }
    return response;
  },
  [ActionTypes.NOTIFICATIONS_DISMISS_ALL]: (): AppThunk => async (
    dispatch,
  ) => {
    dispatch({ type: ActionTypes.NOTIFICATIONS_REQUEST });
    const response = await httpService.postNotificationsDismissAll();
    if (response) {
      dispatch({ type: ActionTypes.NOTIFICATIONS_SUCCESS });
      dispatch({ type: ActionTypes.NOTIFICATIONS_UPDATE, payload: response });
    } else {
      dispatch({ type: ActionTypes.NOTIFICATIONS_FAILURE });
    }
    return response;
  },
};
