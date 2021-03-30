import {
  AccountResponseType,
  ApplicationContextResponseType,
  ApplicationResponseType,
  ApplicationSuiteResponseType,
  BackgroundTasksResponseType,
  DefinitionResponceType,
  NotificationResponseType,
  PanelResponceType,
  SearchResponseType,
} from "./types";

import axios from "axios";

export const BASE_URL =
  "https://collabotics-framework-api.azurewebsites.net/api";

export const urls = {
  accounts: `${BASE_URL}/accounts/`,

  applicationSuites: `${BASE_URL}/application-suites/`,
  applications: (id: string) =>
    `${BASE_URL}/application-suites/${id}/applications/`,
  applicationContentexts: (
    applicationSuiteId: string,
    applicationId: string | undefined
  ) =>
    `${BASE_URL}/application-suites/${applicationSuiteId}/applications/${applicationId}/application-contexts/`,

  notifications: `${BASE_URL}/notifications/`,
  notificationsCount: `${BASE_URL}/notifications/count`,
  notificationsDismiss: (notificationId: string | undefined) =>
    `${BASE_URL}/notifications/${notificationId}/dismiss/`,
  notificationsDismissAll: `${BASE_URL}/notifications/dismiss-all/`,

  backgroundTasks: `${BASE_URL}/background-tasks/`,
  backgroundTasksCount: `${BASE_URL}/background-tasks/count`,
  backgroundTasksDismiss: (taskId: string | undefined) =>
    `${BASE_URL}/background-tasks/${taskId}/dismiss/`,

  searchesHistory: (userId: string) =>
    `${BASE_URL}/users/${userId}/search-history/`,
  searchesHistoryAdd: (userId: string, term: string) =>
    `${BASE_URL}/users/${userId}/search-history/add?terms=${term}`,
  searchesHistoryClear: (userId: string) =>
    `${BASE_URL}/users/${userId}/search-history/clear`,
  searches: (query: string) => `${BASE_URL}/searches?terms=${query}`,

  panels: (id: string) => `${BASE_URL}/panels/${id}/`,

  definitions: `${BASE_URL}/definitions2/`,
};

class HttpService {
  private getData = async <T>(url: string) => {
    try {
      const { data } = await axios.get<T>(url);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  private postData = async <T>(url: string) => {
    try {
      const { data } = await axios.post<T>(url);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  getAccount = () => {
    return this.getData<AccountResponseType>(urls.accounts);
  };
  getApplicationSuites = () => {
    return this.getData<ApplicationSuiteResponseType[]>(urls.applicationSuites);
  };
  getApplications = (applicationSuiteId: string) => {
    return this.getData<ApplicationResponseType[]>(
      urls.applications(applicationSuiteId)
    );
  };
  getApplicationContexts = (
    applicationSuiteId: string,
    applicationId: string | undefined
  ) => {
    return this.getData<ApplicationContextResponseType[]>(
      urls.applicationContentexts(applicationSuiteId, applicationId)
    );
  };
  getNotifications = () => {
    return this.getData<NotificationResponseType[]>(urls.notifications);
  };
  getNotificationsCount = () => {
    return this.getData<number | null>(urls.notificationsCount);
  };
  postNotificationsDismiss = (notificationId: string | undefined) => {
    return this.postData<NotificationResponseType[]>(
      urls.notificationsDismiss(notificationId)
    );
  };
  postNotificationsDismissAll = () => {
    return this.postData<NotificationResponseType[]>(
      urls.notificationsDismissAll
    );
  };
  getBackgroundTasks = () => {
    return this.getData<BackgroundTasksResponseType[]>(urls.backgroundTasks);
  };
  getBackgroundTasksCount = () => {
    return this.getData<number | null>(urls.backgroundTasksCount);
  };
  postBackgroundTasksDismiss = (taskId: string | undefined) => {
    return this.postData<BackgroundTasksResponseType[]>(
      urls.notificationsDismiss(taskId)
    );
  };
  getSearchesHistory = () => {
    return this.getData<string[]>(urls.searchesHistory("1"));
  };
  postSearchesHistoryClear = () => {
    return this.postData<string[]>(urls.searchesHistoryClear("1"));
  };
  postSearchesHistoryAdd = (term: string) => {
    return this.postData<string[]>(urls.searchesHistoryAdd("1", term));
  };
  postSearches = (query: string) => {
    return this.postData<SearchResponseType>(urls.searches(query));
  };
  getPanels = () => {
    return this.getData<PanelResponceType>(
      urls.panels("00000000-0000-0000-0000-000000000000")
    );
  };
  getDefinitions = () => {
    return this.getData<DefinitionResponceType[]>(urls.definitions);
  };
}

export const httpService = new HttpService();
