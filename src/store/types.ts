import {
  AccountType,
  ApplicationContextsType,
  ApplicationSuiteType,
  ApplicationType,
  BackgroundTasksType,
  DefinitionType,
  NotificationType,
  PanelType,
} from "../types/entities";
import { rootReducer, store } from "./index";

import { Action } from "redux";
import { SearchGroupResponseType } from "../services/http/types";
import { ThunkAction } from "redux-thunk";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  StoreAction
>;

export enum ActionTypes {
  // Acoount Store
  ACCOUNT_REQUEST = "ACCOUNT_REQUEST",
  ACCOUNT_SUCCESS = "ACCOUNT_SUCCESS",
  ACCOUNT_FAILURE = "ACCOUNT_FAILURE",
  ACCOUNT_UPDATE = "ACCOUNT_UPDATE",
  ACCOUNT_CLEAN = "ACCOUNT_CLEAN",
  // Applications Suites Store
  APPLICATION_SUITES_REQUEST = "APPLICATION_SUITES_REQUEST",
  APPLICATION_SUITES_SUCCESS = "APPLICATION_SUITES_SUCCESS",
  APPLICATION_SUITES_FAILURE = "APPLICATION_SUITES_FAILURE",
  APPLICATION_SUITES_UPDATE = "APPLICATION_SUITES_UPDATE",
  APPLICATION_SUITES_CLEAN = "APPLICATION_SUITES_CLEAN",
  // Applications Store
  APPLICATIONS_REQUEST = "APPLICATIONS_REQUEST",
  APPLICATIONS_SUCCESS = "APPLICATIONS_SUCCESS",
  APPLICATIONS_FAILURE = "APPLICATIONS_FAILURE",
  APPLICATIONS_UPDATE = "APPLICATIONS_UPDATE",
  APPLICATIONS_CLEAN = "APPLICATIONS_CLEAN",
  APPLICATION_SET = "APPLICATION_SET",
  APPLICATION_REMOVE = "APPLICATION_REMOVE",
  // Aplication Contexts Store
  APPLICATION_CONTEXTS_REQUEST = "APPLICATION_CONTEXTS_REQUEST",
  APPLICATION_CONTEXTS_SUCCESS = "APPLICATION_CONTEXTS_SUCCESS",
  APPLICATION_CONTEXTS_FAILURE = "APPLICATION_CONTEXTS_FAILURE",
  APPLICATION_CONTEXTS_UPDATE = "APPLICATION_CONTEXTS_UPDATE",
  // Notifications Store
  NOTIFICATIONS_REQUEST = "NOTIFICATIONS_REQUEST",
  NOTIFICATIONS_SUCCESS = "NOTIFICATIONS_SUCCESS",
  NOTIFICATIONS_FAILURE = "NOTIFICATIONS_FAILURE",
  NOTIFICATIONS_UPDATE = "NOTIFICATIONS_UPDATE",
  NOTIFICATIONS_COUNT_REQUEST = "NOTIFICATIONS_COUNT_REQUEST",
  NOTIFICATIONS_COUNT_UPDATE = "NOTIFICATIONS_COUNT_UPDATE",
  NOTIFICATIONS_CLEAN = "NOTIFICATIONS_CLEAN",
  NOTIFICATIONS_DISMISS = "NOTIFICATIONS_DISMISS",
  NOTIFICATIONS_DISMISS_ALL = "NOTIFICATIONS_DISMISS_ALL",
  // Background Tasks Store
  BACKGROUND_TASKS_REQUEST = "BACKGROUND_TASKS_REQUEST",
  BACKGROUND_TASKS_SUCCESS = "BACKGROUND_TASKS_SUCCESS",
  BACKGROUND_TASKS_FAILURE = "BACKGROUND_TASKS_FAILURE",
  BACKGROUND_TASKS_UPDATE = "BACKGROUND_TASKS_UPDATE",
  BACKGROUND_TASKS_COUNT_REQUEST = "BACKGROUND_TASKS_COUNT_REQUEST",
  BACKGROUND_TASKS_COUNT_UPDATE = "BACKGROUND_TASKS_COUNT_UPDATE",
  BACKGROUND_TASKS_DISMISS = "BACKGROUND_TASKS_DISMISS",
  // Search store
  SEARCH_HISTORY_REQUEST = "SEARCH_HISTORY_REQUEST",
  SEARCH_HISTORY_UPDATE = "SEARCH_HISTORY_UPDATE",
  SEARCH_REQUEST = "SEARCH_REQUEST",
  SEARCH_UPDATE = "SEARCH_UPDATE",
  SEARCH_SUCCESS = "SEARCH_SUCCESS",
  SEARCH_FAILURE = "SEARCH_FAILURE",
  SEARCH_CLEAR = "SEARCH_CLEAR",
  SEARCH_ADD = "SEARCH_ADD",
  // Panels store
  PANELS_REQUEST = "PANELS_REQUEST",
  PANELS_UPDATE = "PANELS_UPDATE",
  PANELS_SUCCESS = "PANELS_SUCCESS",
  PANELS_FAILURE = "PANELS_FAILURE",
  // Definitions store
  DEFINITIONS_REQUEST = "DEFINITIONS_REQUEST",
  DEFINITIONS_UPDATE = "DEFINITIONS_UPDATE",
  DEFINITIONS_SUCCESS = "DEFINITIONS_SUCCESS",
  DEFINITIONS_FAILURE = "DEFINITIONS_FAILURE",
}

export type AccountActionTypes =
  | (Action<ActionTypes.ACCOUNT_UPDATE> & { payload: AccountType })
  | Action<ActionTypes.ACCOUNT_REQUEST>
  | Action<ActionTypes.ACCOUNT_SUCCESS>
  | Action<ActionTypes.ACCOUNT_FAILURE>
  | Action<ActionTypes.ACCOUNT_CLEAN>;

export type ApplicationSuitesActionTypes =
  | (Action<ActionTypes.APPLICATION_SUITES_UPDATE> & {
      payload: ApplicationSuiteType[];
    })
  | Action<ActionTypes.APPLICATION_SUITES_REQUEST>
  | Action<ActionTypes.APPLICATION_SUITES_SUCCESS>
  | Action<ActionTypes.APPLICATION_SUITES_FAILURE>
  | Action<ActionTypes.APPLICATION_SUITES_CLEAN>;

export type ApplicationsActionTypes =
  | (Action<ActionTypes.APPLICATIONS_UPDATE> & {
      payload: ApplicationType[];
    })
  | Action<ActionTypes.APPLICATIONS_REQUEST>
  | Action<ActionTypes.APPLICATIONS_SUCCESS>
  | Action<ActionTypes.APPLICATIONS_FAILURE>
  | Action<ActionTypes.APPLICATIONS_CLEAN>
  | Action<ActionTypes.APPLICATION_SET>
  | Action<ActionTypes.APPLICATION_REMOVE>;

export type ApplicationContextsActionTypes =
  | (Action<ActionTypes.APPLICATION_CONTEXTS_UPDATE> & {
      payload: ApplicationContextsType[];
    })
  | Action<ActionTypes.APPLICATION_CONTEXTS_REQUEST>
  | Action<ActionTypes.APPLICATION_CONTEXTS_SUCCESS>
  | Action<ActionTypes.APPLICATION_CONTEXTS_FAILURE>;

export type NotificationsActionTypes =
  | (Action<ActionTypes.NOTIFICATIONS_UPDATE> & {
      payload: NotificationType[];
    })
  | (Action<ActionTypes.NOTIFICATIONS_COUNT_UPDATE> & {
      payload: number | null;
    })
  | Action<ActionTypes.NOTIFICATIONS_REQUEST>
  | Action<ActionTypes.NOTIFICATIONS_SUCCESS>
  | Action<ActionTypes.NOTIFICATIONS_FAILURE>
  | Action<ActionTypes.NOTIFICATIONS_CLEAN>
  | Action<ActionTypes.NOTIFICATIONS_COUNT_REQUEST>;

export type BackgroundTasksActionTypes =
  | (Action<ActionTypes.BACKGROUND_TASKS_UPDATE> & {
      payload: BackgroundTasksType[];
    })
  | (Action<ActionTypes.BACKGROUND_TASKS_COUNT_UPDATE> & {
      payload: number | null;
    })
  | Action<ActionTypes.BACKGROUND_TASKS_REQUEST>
  | Action<ActionTypes.BACKGROUND_TASKS_SUCCESS>
  | Action<ActionTypes.BACKGROUND_TASKS_FAILURE>
  | Action<ActionTypes.BACKGROUND_TASKS_COUNT_REQUEST>;

export type SearchActionTypes =
  | (Action<ActionTypes.SEARCH_HISTORY_UPDATE> & {
      payload: string[];
    })
  | (Action<ActionTypes.SEARCH_UPDATE> & {
      payload: SearchGroupResponseType[];
    })
  | Action<ActionTypes.SEARCH_REQUEST>
  | Action<ActionTypes.SEARCH_SUCCESS>
  | Action<ActionTypes.SEARCH_FAILURE>
  | Action<ActionTypes.SEARCH_HISTORY_REQUEST>
  | Action<ActionTypes.SEARCH_CLEAR>
  | Action<ActionTypes.SEARCH_ADD>;

export type PanelsActionTypes =
  | (Action<ActionTypes.PANELS_UPDATE> & {
      payload: PanelType;
    })
  | Action<ActionTypes.PANELS_REQUEST>
  | Action<ActionTypes.PANELS_SUCCESS>
  | Action<ActionTypes.PANELS_FAILURE>;

export type DefinitionsActionTypes =
  | (Action<ActionTypes.DEFINITIONS_UPDATE> & {
      payload: DefinitionType[];
    })
  | Action<ActionTypes.DEFINITIONS_REQUEST>
  | Action<ActionTypes.DEFINITIONS_SUCCESS>
  | Action<ActionTypes.DEFINITIONS_FAILURE>;

export type StoreAction =
  | AccountActionTypes
  | ApplicationSuitesActionTypes
  | ApplicationsActionTypes
  | NotificationsActionTypes
  | ApplicationContextsActionTypes
  | BackgroundTasksActionTypes
  | SearchActionTypes
  | PanelsActionTypes
  | DefinitionsActionTypes;
