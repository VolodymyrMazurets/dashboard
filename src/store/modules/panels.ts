import { ActionTypes, AppThunk, PanelsActionTypes } from '../types';

import { PanelResponceItemType } from '../../services/http/types';
import { httpService } from '../../services';

export interface PanelsState {
  loading: boolean;
  error: boolean;
  panels?: PanelResponceItemType[];
}

const initialState: PanelsState = {
  loading: false,
  error: false,
  panels: undefined,
};

export const panelsReducer = (
  state = initialState,
  action: PanelsActionTypes
): PanelsState => {
  switch (action.type) {
    case ActionTypes.PANELS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.PANELS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.PANELS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.PANELS_UPDATE: {
      return {
        ...state,
        panels: [...action.payload.PanelItems],
      };
    }
    default:
      return state;
  }
};

export const panelsActions = {
  [ActionTypes.PANELS_REQUEST]: (): AppThunk => async (
    dispatch
  ) => {
    dispatch({ type: ActionTypes.PANELS_REQUEST });
    const response = await httpService.getPanels();
    if (response) {
      dispatch({ type: ActionTypes.PANELS_SUCCESS });
      dispatch({
        type: ActionTypes.PANELS_UPDATE,
        payload: response,
      });
    } else {
      dispatch({ type: ActionTypes.PANELS_FAILURE });
    }
    return response;
  },
};
