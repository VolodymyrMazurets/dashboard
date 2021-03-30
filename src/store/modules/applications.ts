import { ActionTypes, AppThunk, ApplicationsActionTypes } from "../types";
import { flatten, map } from "lodash";

import { ApplicationType } from "../../types/entities";
import { httpService } from "../../services";

export interface ApplicationsState {
  loading: boolean;
  error: boolean;
  applications: ApplicationType[];
}

const initialState: ApplicationsState = {
  loading: false,
  error: false,
  applications: [],
};

export const applicationsReducer = (
  state = initialState,
  action: ApplicationsActionTypes
): ApplicationsState => {
  switch (action.type) {
    case ActionTypes.APPLICATIONS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.APPLICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.APPLICATIONS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.APPLICATIONS_UPDATE: {
      return {
        ...state,
        applications: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export const applicationsActions = {
  [ActionTypes.APPLICATIONS_REQUEST]: (): AppThunk => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: ActionTypes.APPLICATION_SUITES_REQUEST });
    const applicationSuites =
      getState().applicationSuitesState?.applicationSuites || [];

    const payload = await Promise.all(
      applicationSuites.map(async ({ Id }) => {
        if (Id) {
          const data = await httpService.getApplications(Id);

          return map(data, (application) => {
            return { ...application, applicationSuiteId: Id };
          });
        }
        return [];
      })
    );
    if (payload) {
      dispatch({ type: ActionTypes.APPLICATIONS_SUCCESS });
      dispatch({
        type: ActionTypes.APPLICATIONS_UPDATE,
        payload: flatten(payload),
      });
    } else {
      dispatch({ type: ActionTypes.APPLICATIONS_FAILURE });
    }
  },
};
