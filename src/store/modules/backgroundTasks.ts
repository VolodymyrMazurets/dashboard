import { ActionTypes, AppThunk, BackgroundTasksActionTypes } from "../types";

import { BackgroundTasksType } from "../../types/entities";
import { httpService } from "../../services";

export interface BackgroundTasksState {
  loading: boolean;
  error: boolean;
  backgroundTasks: BackgroundTasksType[];
  count: number | null;
}

const initialState: BackgroundTasksState = {
  loading: false,
  error: false,
  backgroundTasks: [],
  count: null,
};

export const backgroundTasksReducer = (
  state = initialState,
  action: BackgroundTasksActionTypes
): BackgroundTasksState => {
  switch (action.type) {
    case ActionTypes.BACKGROUND_TASKS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.BACKGROUND_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.BACKGROUND_TASKS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.BACKGROUND_TASKS_UPDATE: {
      return {
        ...state,
        backgroundTasks: [...action.payload],
      };
    }
    case ActionTypes.BACKGROUND_TASKS_COUNT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.BACKGROUND_TASKS_COUNT_UPDATE: {
      return {
        ...state,
        count: action.payload,
      };
    }
    default:
      return state;
  }
};

export const backgroundTasksActions = {
  [ActionTypes.BACKGROUND_TASKS_REQUEST]: (): AppThunk => async (dispatch) => {
    dispatch({ type: ActionTypes.BACKGROUND_TASKS_REQUEST });
    const response = await httpService.getBackgroundTasks();
    if (response) {
      dispatch({ type: ActionTypes.BACKGROUND_TASKS_SUCCESS });
      dispatch({
        type: ActionTypes.BACKGROUND_TASKS_UPDATE,
        payload: response,
      });
    } else {
      dispatch({ type: ActionTypes.BACKGROUND_TASKS_FAILURE });
    }
    return response;
  },

  [ActionTypes.BACKGROUND_TASKS_COUNT_REQUEST]: (): AppThunk => async (
    dispatch
  ) => {
    dispatch({ type: ActionTypes.BACKGROUND_TASKS_REQUEST });
    const response = await httpService.getBackgroundTasksCount();
    if (response) {
      dispatch({ type: ActionTypes.BACKGROUND_TASKS_SUCCESS });
      dispatch({
        type: ActionTypes.BACKGROUND_TASKS_COUNT_UPDATE,
        payload: response,
      });
    } else {
      dispatch({ type: ActionTypes.BACKGROUND_TASKS_SUCCESS });
    }
    return response;
  },

  [ActionTypes.BACKGROUND_TASKS_DISMISS]: (
    taskId: string | undefined
  ): AppThunk => async (dispatch) => {
    dispatch({ type: ActionTypes.BACKGROUND_TASKS_REQUEST });
    const response = await httpService.postBackgroundTasksDismiss(taskId);
    if (response) {
      dispatch({ type: ActionTypes.BACKGROUND_TASKS_SUCCESS });
      dispatch({ type: ActionTypes.BACKGROUND_TASKS_UPDATE, payload: response });
    } else {
      dispatch({ type: ActionTypes.BACKGROUND_TASKS_FAILURE });
    }
    return response;
  },
};
