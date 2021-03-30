import { ActionTypes, AppThunk, DefinitionsActionTypes } from "../types";

import { DefinitionType } from "../../types/entities";
import { httpService } from "../../services";
import { map } from "lodash";

export interface DefinitionsState {
  loading: boolean;
  error: boolean;
  definitions?: DefinitionType[];
}

const initialState: DefinitionsState = {
  loading: false,
  error: false,
  definitions: undefined,
};

export const definitionsReducer = (
  state = initialState,
  action: DefinitionsActionTypes
): DefinitionsState => {
  switch (action.type) {
    case ActionTypes.DEFINITIONS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ActionTypes.DEFINITIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case ActionTypes.DEFINITIONS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ActionTypes.DEFINITIONS_UPDATE: {
      return {
        ...state,
        definitions: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export const definitionsActions = {
  [ActionTypes.DEFINITIONS_REQUEST]: (): AppThunk => async (dispatch) => {
    dispatch({ type: ActionTypes.DEFINITIONS_REQUEST });
    const response = await httpService.getDefinitions();
    if (response) {
      const mapedResponse = map(response, (e) => {
        return {
          ...e,
          label: e.Name,
          value: e.Id,
          Revisions: map(e.Revisions, (item) => ({
            ...item,
            value: item.Id,
            label: item.Text,
          })),
        };
      });
      dispatch({ type: ActionTypes.DEFINITIONS_SUCCESS });
      dispatch({
        type: ActionTypes.DEFINITIONS_UPDATE,
        payload: mapedResponse,
      });
    } else {
      dispatch({ type: ActionTypes.DEFINITIONS_FAILURE });
    }
    return response;
  },
};
