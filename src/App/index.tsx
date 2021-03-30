import "./App.scss";

import { LoaderContextProvider, useLoader } from "../context/LoaderContext";
import React, { FC, useContext, useEffect } from "react";
import { ThemeContext, ThemeContextProvider } from "../context/ThemeContext";
import { darkThemeVars, lightThemeVars } from "../themes";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { RouterView } from "../router";
import { TheHeader } from "../components";
import { accountActions } from "../store/modules/account";
// import { applicationContextsActions } from "../store/modules/applicationContexts";
import { applicationSuitesActions } from "../store/modules/applicationSuites";
import { applicationsActions } from "../store/modules/applications";
import { backgroundTasksActions } from "../store/modules/backgroundTasks";
import classNames from "classnames";
import { definitionsActions } from "../store/modules/definitions";
import { notificationsActions } from "../store/modules/notifications";
import { panelsActions } from "../store/modules/panels";
import { searchesActions } from "../store/modules/searches";
import store from "../store";
import { useDispatch } from "react-redux";

const AppCore: FC = () => {
  const dispatch = useDispatch();
  const { lineLoader } = useLoader();

  const { darkTheme } = useContext(ThemeContext);

  const currentThemeVars = darkTheme
    ? (darkThemeVars as React.CSSProperties)
    : (lightThemeVars as React.CSSProperties);

  useEffect(() => {
    const fetchData = async () => {
      lineLoader.show();

      Promise.all([
        await dispatch(accountActions["ACCOUNT_REQUEST"]()),
        await dispatch(applicationSuitesActions["APPLICATION_SUITES_REQUEST"]()),
        dispatch(applicationsActions["APPLICATIONS_REQUEST"]()),
        dispatch(backgroundTasksActions["BACKGROUND_TASKS_REQUEST"]()),
        dispatch(backgroundTasksActions["BACKGROUND_TASKS_COUNT_REQUEST"]()),
        dispatch(notificationsActions["NOTIFICATIONS_REQUEST"]()),
        dispatch(notificationsActions["NOTIFICATIONS_COUNT_REQUEST"]()),
        dispatch(searchesActions["SEARCH_HISTORY_REQUEST"]()),
        dispatch(panelsActions["PANELS_REQUEST"]()),
        dispatch(definitionsActions["DEFINITIONS_REQUEST"]()),
      ]);

      lineLoader.hide();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    document.body.style.background = darkTheme ? "#212121" : "#fff";
  }, [darkTheme]);

  return (
    <div
      className={classNames("App", { "dark-theme": darkTheme })}
      style={currentThemeVars}
      id="mainApp"
    >
      <BrowserRouter>
        <TheHeader />
        <RouterView />
      </BrowserRouter>
    </div>
  );
};

export const App: FC = () => {
  return (
    <Provider store={store}>
      <LoaderContextProvider>
        <ThemeContextProvider>
          <AppCore />
        </ThemeContextProvider>
      </LoaderContextProvider>
    </Provider>
  );
};
