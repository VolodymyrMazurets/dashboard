import {
  ActionTypes,
  AppThunk,
  ApplicationContextsActionTypes,
} from "../types";

import { ApplicationContextsType } from "../../types/entities";
import { httpService } from "../../services";

export interface ApplicationContextsState {
  loading: boolean;
  error: boolean;
  contexts: ApplicationContextsType[];
}

const initialState: ApplicationContextsState = {
  loading: false,
  error: false,
  contexts: [],
};

export const applicationContextsReducer = (
  state = initialState,
  action: ApplicationContextsActionTypes
): ApplicationContextsState => {
  switch (action.type) {
    case ActionTypes.APPLICATION_CONTEXTS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.APPLICATION_CONTEXTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.APPLICATION_CONTEXTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.APPLICATION_CONTEXTS_UPDATE: {
      return {
        ...state,
        contexts: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export const applicationContextsActions = {
  [ActionTypes.APPLICATION_CONTEXTS_REQUEST]: (): AppThunk => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: ActionTypes.APPLICATION_CONTEXTS_REQUEST });
    const applications = getState().applicationsState.applications || [];

    const payload = await Promise.all(
      applications.map(async (e) => {
        if (e?.Id && e?.applicationSuiteId) {
          const data = await httpService.getApplicationContexts(
            e.applicationSuiteId,
            e.Id
          );
          return { ...e, Contexts: data };
        }
        return [];
      })
    );
    if (payload) {
      dispatch({ type: ActionTypes.APPLICATION_CONTEXTS_SUCCESS });
      // dispatch({
      //   type: ActionTypes.APPLICATION_CONTEXTS_UPDATE,
      //   payload: payload,
      // });
    } else {
      dispatch({ type: ActionTypes.APPLICATION_CONTEXTS_FAILURE });
    }
  },
};
