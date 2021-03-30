import {
  AccountResponseType,
  ApplicationContextResponseType,
  ApplicationResponseType,
  ApplicationSuiteResponseType,
  BackgroundTasksResponseType,
  DefinitionResponceType,
  NotificationResponseType,
  PanelResponceType,
  RevisionResponceType,
  SearchResponseType,
} from "../services/http/types";

export interface AccountType extends AccountResponseType {}

export interface ApplicationSuiteType extends ApplicationSuiteResponseType {}

export interface ApplicationType extends ApplicationResponseType {
  applicationSuiteId?: ApplicationSuiteType["Id"];
}

export interface ApplicationContextsType
  extends ApplicationContextResponseType {}

export interface NotificationType extends NotificationResponseType {}

export interface BackgroundTasksType extends BackgroundTasksResponseType {}

export interface SearchType extends SearchResponseType {}

export interface PanelType extends PanelResponceType {}

export interface DefinitionType extends DefinitionResponceType {
  label: string;
  value: string;
}

export interface RevisionType extends RevisionResponceType {
  label: string;
  value: string;
}

