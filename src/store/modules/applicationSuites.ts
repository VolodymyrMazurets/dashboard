import { ApplicationSuitesActionTypes, ActionTypes, AppThunk } from '../types';
import { httpService } from '../../services';
import { ApplicationSuiteType } from '../../types/entities';

export interface ApplicationSuitesState {
  loading: boolean;
  error: boolean;
  applicationSuites?: ApplicationSuiteType[];
}

const initialState: ApplicationSuitesState = {
  loading: false,
  error: false,
  applicationSuites: undefined,
};

export const applicationSuitesReducer = (
  state = initialState,
  action: ApplicationSuitesActionTypes
): ApplicationSuitesState => {
  switch (action.type) {
    case ActionTypes.APPLICATION_SUITES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.APPLICATION_SUITES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.APPLICATION_SUITES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.APPLICATION_SUITES_UPDATE: {
      return {
        ...state,
        applicationSuites: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export const applicationSuitesActions = {
  [ActionTypes.APPLICATION_SUITES_REQUEST]: (): AppThunk => async (
    dispatch
  ) => {
    dispatch({ type: ActionTypes.APPLICATION_SUITES_REQUEST });
    const response = await httpService.getApplicationSuites();
    if (response) {
      dispatch({ type: ActionTypes.APPLICATION_SUITES_SUCCESS });
      dispatch({
        type: ActionTypes.APPLICATION_SUITES_UPDATE,
        payload: response,
      });
    } else {
      dispatch({ type: ActionTypes.APPLICATION_SUITES_FAILURE });
    }
    return response;
  },
};
