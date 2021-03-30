import { MiddlewareArray, configureStore } from "@reduxjs/toolkit";

import { accountReducer } from "./modules/account";
import { applicationSuitesReducer } from "./modules/applicationSuites";
import { applicationsReducer } from "./modules/applications";
import { backgroundTasksReducer } from "./modules/backgroundTasks";
import { combineReducers } from "redux";
import { definitionsReducer } from "./modules/definitions";
import logger from "redux-logger";
import { notificationsReducer } from "./modules/notifications";
import { panelsReducer } from "./modules/panels";
import { searchReducer } from "./modules/searches";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  accountState: accountReducer,
  applicationSuitesState: applicationSuitesReducer,
  applicationsState: applicationsReducer,
  notificationsState: notificationsReducer,
  backgroundTasksState: backgroundTasksReducer,
  searchState: searchReducer,
  panelsState: panelsReducer,
  definitionsState: definitionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(thunk, logger),
});

export default store;
