import { ActionTypes, AppThunk, SearchActionTypes } from "../types";

import { SearchGroupResponseType } from "../../services/http/types";
import { httpService } from "../../services";

export interface SearchState {
  loading: boolean;
  error: boolean;
  result: SearchGroupResponseType[];
  history: string[];
}

const initialState: SearchState = {
  loading: false,
  error: false,
  result: [],
  history: [],
};

export const searchReducer = (
  state = initialState,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case ActionTypes.SEARCH_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.SEARCH_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.SEARCH_UPDATE: {
      return {
        ...state,
        result: [...action.payload],
      };
    }
    case ActionTypes.SEARCH_HISTORY_UPDATE: {
      return {
        ...state,
        history: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export const searchesActions = {
  [ActionTypes.SEARCH_REQUEST]: (query: string): AppThunk => async (
    dispatch
  ) => {
    dispatch({ type: ActionTypes.SEARCH_REQUEST });
    const response = await httpService.postSearches(query);
    const arr = response?.Groups || [];
    if (response) {
      dispatch({ type: ActionTypes.SEARCH_REQUEST });
      dispatch({ type: ActionTypes.SEARCH_UPDATE, payload: arr });
    } else {
      dispatch({ type: ActionTypes.SEARCH_FAILURE });
    }
    return response;
  },
  [ActionTypes.SEARCH_HISTORY_REQUEST]: (): AppThunk => async (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_REQUEST });
    const response = await httpService.getSearchesHistory();
    if (response) {
      dispatch({ type: ActionTypes.SEARCH_SUCCESS });
      dispatch({ type: ActionTypes.SEARCH_HISTORY_UPDATE, payload: response });
    } else {
      dispatch({ type: ActionTypes.SEARCH_FAILURE });
    }
    return response;
  },
  [ActionTypes.SEARCH_CLEAR]: (): AppThunk => async (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_REQUEST });
    const response = await httpService.postSearchesHistoryClear();
    dispatch({ type: ActionTypes.SEARCH_SUCCESS });
    dispatch(searchesActions[ActionTypes.SEARCH_HISTORY_REQUEST]());
    return response;
  },
  [ActionTypes.SEARCH_ADD]: (term: string): AppThunk => async (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_REQUEST });
    const response = await httpService.postSearchesHistoryAdd(term);
    if (response) {
      dispatch({ type: ActionTypes.SEARCH_SUCCESS });
    } else {
      dispatch({ type: ActionTypes.SEARCH_FAILURE });
    }
    return response;
  },
};
